package com.everydaydeals.backend.controller;

import com.everydaydeals.backend.dto.PagedResponse;
import com.everydaydeals.backend.dto.ProductDto;
import com.everydaydeals.backend.dto.ProductRequest;
import com.everydaydeals.backend.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products?page=1&limit=24&sort=latest
     * Returns a paginated list of all active products.
     * sort values: latest (default), price_asc, price_desc, discount
     */
    @GetMapping
    public ResponseEntity<PagedResponse<ProductDto>> getAll(
            @RequestParam(defaultValue = "1")      @Min(1)           int page,
            @RequestParam(defaultValue = "24")     @Min(1) @Max(100) int limit,
            @RequestParam(defaultValue = "latest")                   String sort
    ) {
        return ResponseEntity.ok(productService.getAll(page, limit, sort));
    }

    /**
     * GET /api/products/{id}
     * Returns a single product by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    /**
     * GET /api/products/category/{category}?page=1&limit=24&sort=latest
     * Returns products filtered by category.
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<PagedResponse<ProductDto>> getByCategory(
            @PathVariable                                            String category,
            @RequestParam(defaultValue = "1")      @Min(1)          int page,
            @RequestParam(defaultValue = "24") @Min(1) @Max(100)    int limit,
            @RequestParam(defaultValue = "latest")                   String sort
    ) {
        return ResponseEntity.ok(productService.getByCategory(category, page, limit, sort));
    }

    /**
     * GET /api/products/search?q=keyword&page=1&limit=24&sort=latest
     * Full-text search across title, description, and retailer.
     */
    @GetMapping("/search")
    public ResponseEntity<PagedResponse<ProductDto>> search(
            @RequestParam                                            String q,
            @RequestParam(defaultValue = "1")      @Min(1)          int page,
            @RequestParam(defaultValue = "24") @Min(1) @Max(100)    int limit,
            @RequestParam(defaultValue = "latest")                   String sort
    ) {
        return ResponseEntity.ok(productService.search(q, page, limit, sort));
    }

    // ── Admin / management endpoints ─────────────────────────────────────
    // No auth layer yet – protect these with Spring Security when ready.

    /**
     * POST /api/products
     * Creates a new product. Body: ProductRequest JSON.
     */
    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(req));
    }

    /**
     * PUT /api/products/{id}
     * Updates an existing product.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest req
    ) {
        return ResponseEntity.ok(productService.update(id, req));
    }

    /**
     * DELETE /api/products/{id}
     * Soft-deletes a product (sets active = false).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
