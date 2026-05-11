package com.everydaydeals.backend.dto;

import com.everydaydeals.backend.model.Product;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * Read-only view of a Product sent to the frontend.
 * Field names match the JavaScript object shape the React app expects.
 */
@Getter
public class ProductDto {

    private final Long       id;
    private final String     title;
    private final String     description;
    private final BigDecimal price;
    private final BigDecimal originalPrice;
    private final String     imageUrl;
    private final String     affiliateUrl;
    private final String     retailer;
    private final String     category;
    private final Instant    createdAt;

    public ProductDto(Product p) {
        this.id            = p.getId();
        this.title         = p.getTitle();
        this.description   = p.getDescription();
        this.price         = p.getPrice();
        this.originalPrice = p.getOriginalPrice();
        this.imageUrl      = p.getImageUrl();
        this.affiliateUrl  = p.getAffiliateUrl();
        this.retailer      = p.getRetailer();
        this.category      = p.getCategory();
        this.createdAt     = p.getCreatedAt();
    }
}
