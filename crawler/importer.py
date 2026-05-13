#!/usr/bin/env python3
"""
Everyday Deals – CSV Product Importer
======================================
Reads products from a CSV file and upserts them into the backend via the
admin REST API.  Existing products are matched by title+retailer and updated
in-place; new products are created.

Usage
-----
    pip install -r requirements.txt

    # Basic (uses defaults: localhost:8080, products.csv)
    python importer.py --api-key YOUR_ADMIN_KEY

    # Custom CSV and API URL
    python importer.py --csv my_products.csv \
                       --api-url https://api.example.com \
                       --api-key YOUR_ADMIN_KEY

CSV columns (header row required)
----------------------------------
    title, description, price, originalPrice, imageUrl,
    affiliateUrl, retailer, category, featured

    - featured: "true" / "1" / "yes"  → true, anything else → false
    - price / originalPrice: decimal numbers (no currency symbol)
    - All columns except title are optional (can be left blank)

Exit codes
----------
    0  all rows processed successfully
    1  one or more rows failed (details printed to stderr)
"""

import argparse
import csv
import json
import sys
from pathlib import Path

import requests

# ── Helpers ─────────────────────────────────────────────────────────────────

def parse_bool(value: str) -> bool:
    return value.strip().lower() in {"true", "1", "yes"}


def parse_decimal(value: str):
    """Return float or None for blank/invalid values."""
    v = value.strip()
    if not v:
        return None
    try:
        return float(v)
    except ValueError:
        return None


def csv_row_to_request(row: dict) -> dict:
    """Convert a CSV row dict into a ProductRequest JSON body."""
    return {
        "title":         row.get("title", "").strip(),
        "description":   row.get("description", "").strip() or None,
        "price":         parse_decimal(row.get("price", "")),
        "originalPrice": parse_decimal(row.get("originalPrice", "")),
        "imageUrl":      row.get("imageUrl", "").strip() or None,
        "affiliateUrl":  row.get("affiliateUrl", "").strip() or None,
        "retailer":      row.get("retailer", "").strip() or None,
        "category":      row.get("category", "").strip() or None,
        "featured":      parse_bool(row.get("featured", "")),
    }


def fetch_all_products(session: requests.Session, api_url: str) -> list[dict]:
    """Fetch all active products (pages through the API)."""
    products = []
    page = 1
    while True:
        resp = session.get(f"{api_url}/products", params={"page": page, "limit": 100})
        resp.raise_for_status()
        data = resp.json()
        items = data.get("products", [])
        products.extend(items)
        if page >= data.get("totalPages", 1):
            break
        page += 1
    return products


def build_index(products: list[dict]) -> dict[tuple, int]:
    """Index existing products by (title_lower, retailer_lower) → id."""
    return {
        (p["title"].lower(), (p.get("retailer") or "").lower()): p["id"]
        for p in products
    }


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Import products from CSV into Everyday Deals backend.")
    parser.add_argument("--csv",     default="products.csv", help="Path to CSV file (default: products.csv)")
    parser.add_argument("--api-url", default="http://localhost:8080/api", help="Backend API base URL")
    parser.add_argument("--api-key", required=True, help="X-Admin-Key header value")
    parser.add_argument("--dry-run", action="store_true", help="Parse CSV and print actions without making API calls")
    args = parser.parse_args()

    csv_path = Path(args.csv)
    if not csv_path.exists():
        print(f"ERROR: CSV file not found: {csv_path}", file=sys.stderr)
        sys.exit(1)

    session = requests.Session()
    session.headers.update({
        "Content-Type":  "application/json",
        "X-Admin-Key":   args.api_key,
    })

    # Read CSV
    with csv_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Read {len(rows)} row(s) from {csv_path}")

    if args.dry_run:
        print("[dry-run] Rows that would be imported:")
        for r in rows:
            print(" ", json.dumps(csv_row_to_request(r), ensure_ascii=False))
        return

    # Fetch existing products to detect creates vs updates
    print("Fetching existing products from API…")
    try:
        existing = fetch_all_products(session, args.api_url)
    except requests.RequestException as e:
        print(f"ERROR: Could not reach API at {args.api_url}: {e}", file=sys.stderr)
        sys.exit(1)

    index = build_index(existing)
    print(f"Found {len(existing)} existing product(s).")

    created = updated = skipped = 0
    errors: list[str] = []

    for i, row in enumerate(rows, start=2):   # row 1 = header
        body = csv_row_to_request(row)

        if not body["title"]:
            print(f"  Row {i}: skipped (empty title)")
            skipped += 1
            continue

        key = (body["title"].lower(), (body.get("retailer") or "").lower())
        existing_id = index.get(key)

        try:
            if existing_id:
                resp = session.put(f"{args.api_url}/products/{existing_id}", json=body, timeout=10)
                resp.raise_for_status()
                updated += 1
                print(f"  Row {i}: UPDATED  id={existing_id}  \"{body['title']}\"")
            else:
                resp = session.post(f"{args.api_url}/products", json=body, timeout=10)
                resp.raise_for_status()
                new_id = resp.json().get("id", "?")
                index[key] = new_id          # prevent duplicate creates in same run
                created += 1
                print(f"  Row {i}: CREATED  id={new_id}  \"{body['title']}\"")

        except requests.HTTPError as e:
            msg = f"Row {i}: HTTP {e.response.status_code} for \"{body['title']}\": {e.response.text[:200]}"
            print(f"  ERROR {msg}", file=sys.stderr)
            errors.append(msg)
        except requests.RequestException as e:
            msg = f"Row {i}: network error for \"{body['title']}\": {e}"
            print(f"  ERROR {msg}", file=sys.stderr)
            errors.append(msg)

    print(f"\nDone. Created: {created}  Updated: {updated}  Skipped: {skipped}  Errors: {len(errors)}")
    if errors:
        print("\nFailed rows:", file=sys.stderr)
        for e in errors:
            print(f"  {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
