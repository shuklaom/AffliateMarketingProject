package com.everydaydeals.backend.repository;

import com.everydaydeals.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /** All active products, newest first. */
    Page<Product> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    /** Active products in a given category, newest first. */
    Page<Product> findByActiveTrueAndCategoryIgnoreCaseOrderByCreatedAtDesc(
            String category, Pageable pageable);

    /** Full-text search across title, description, and retailer. */
    @Query("""
            SELECT p FROM Product p
            WHERE p.active = true
              AND (LOWER(p.title)       LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.retailer)    LIKE LOWER(CONCAT('%', :q, '%')))
            ORDER BY p.createdAt DESC
            """)
    Page<Product> searchActive(@Param("q") String query, Pageable pageable);
}
