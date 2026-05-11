package com.everydaydeals.backend.dto;

import java.util.List;

/**
 * Paginated response envelope.
 * Matches the shape useProducts.js normalise() expects:
 *   { products: [...], totalPages: N, page: N, totalElements: N }
 */
public record PagedResponse<T>(
        List<T> products,
        int     page,
        int     totalPages,
        long    totalElements
) {}
