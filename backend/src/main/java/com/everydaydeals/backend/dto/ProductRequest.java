package com.everydaydeals.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Request body for creating or updating a product.
 */
@Getter
@Setter
@NoArgsConstructor
public class ProductRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @PositiveOrZero(message = "Price must be 0 or greater")
    private BigDecimal price;

    @PositiveOrZero(message = "Original price must be 0 or greater")
    private BigDecimal originalPrice;

    private String imageUrl;
    private String affiliateUrl;
    private String retailer;
    private String category;
}
