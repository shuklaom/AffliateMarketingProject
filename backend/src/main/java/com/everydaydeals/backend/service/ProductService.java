package com.everydaydeals.backend.service;

import com.everydaydeals.backend.dto.PagedResponse;
import com.everydaydeals.backend.dto.ProductDto;
import com.everydaydeals.backend.dto.ProductRequest;
import com.everydaydeals.backend.model.Product;
import com.everydaydeals.backend.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository repo;

    // ── Read operations ─────────────────────────────────────────────────

    public PagedResponse<ProductDto> getAll(int page, int limit, String sort) {
        Pageable pageable = PageRequest.of(page - 1, limit, buildSort(sort));
        return toResponse(repo.findByActiveTrue(pageable), page);
    }

    public ProductDto getById(Long id) {
        Product product = repo.findById(id)
                .filter(Product::isActive)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        return new ProductDto(product);
    }

    public PagedResponse<ProductDto> getByCategory(String category, int page, int limit, String sort) {
        Pageable pageable = PageRequest.of(page - 1, limit, buildSort(sort));
        return toResponse(
                repo.findByActiveTrueAndCategoryIgnoreCase(category, pageable),
                page
        );
    }

    public PagedResponse<ProductDto> search(String query, int page, int limit, String sort) {
        Pageable pageable = PageRequest.of(page - 1, limit, buildSort(sort));
        return toResponse(repo.searchActive(query.trim(), pageable), page);
    }

    public List<ProductDto> getFeatured(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        return repo.findByActiveTrueAndFeaturedTrue(pageable)
                   .stream().map(ProductDto::new).toList();
    }

    // ── Write operations ─────────────────────────────────────────────────

    @Transactional
    public ProductDto create(ProductRequest req) {
        Product product = new Product();
        applyRequest(product, req);
        return new ProductDto(repo.save(product));
    }

    @Transactional
    public ProductDto update(Long id, ProductRequest req) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        applyRequest(product, req);
        return new ProductDto(repo.save(product));
    }

    @Transactional
    public void delete(Long id) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        // Soft-delete: keeps the row but hides it from all queries
        product.setActive(false);
        repo.save(product);
    }

    @Transactional
    public void recordClick(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Product not found: " + id);
        }
        repo.incrementClickCount(id);
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    /**
     * Maps the frontend sort value to a Spring Data Sort.
     * Unknown values default to newest-first. This whitelist also prevents
     * arbitrary field names from reaching the query layer.
     */
    private Sort buildSort(String sort) {
        return switch (sort == null ? "latest" : sort) {
            case "price_asc"  -> Sort.by(Sort.Direction.ASC,  "price");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "discount"   -> Sort.by(Sort.Direction.DESC, "discountPct");
            default           -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    private void applyRequest(Product product, ProductRequest req) {
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setOriginalPrice(req.getOriginalPrice());
        product.setImageUrl(req.getImageUrl());
        product.setAffiliateUrl(req.getAffiliateUrl());
        product.setRetailer(req.getRetailer());
        product.setCategory(req.getCategory());
        product.setFeatured(req.isFeatured());
    }

    private PagedResponse<ProductDto> toResponse(Page<Product> page, int requestedPage) {
        return new PagedResponse<>(
                page.getContent().stream().map(ProductDto::new).toList(),
                requestedPage,
                page.getTotalPages() == 0 ? 1 : page.getTotalPages(),
                page.getTotalElements()
        );
    }
}
