package com.everydaydeals.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 500)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @PositiveOrZero
    @Column(precision = 12, scale = 2)
    private BigDecimal price;

    @PositiveOrZero
    @Column(name = "original_price", precision = 12, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "image_url", length = 2000)
    private String imageUrl;

    @Column(name = "affiliate_url", length = 2000)
    private String affiliateUrl;

    @Column(length = 200)
    private String retailer;

    @Column(length = 200)
    private String category;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    /** Computed discount ratio — used only for ORDER BY, never sent to clients. */
    @Formula("CASE WHEN original_price > 0 THEN (original_price - price) / original_price ELSE 0 END")
    private Double discountPct;
}
