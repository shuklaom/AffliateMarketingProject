package com.everydaydeals.backend.repository;

import com.everydaydeals.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /** All active products – order is supplied via Pageable's Sort. */
    Page<Product> findByActiveTrue(Pageable pageable);

    /** Active products in a given category – order via Pageable's Sort. */
    Page<Product> findByActiveTrueAndCategoryIgnoreCase(
            String category, Pageable pageable);

    /** Full-text search across title, description, and retailer – order via Pageable's Sort. */
    @Query("""
            SELECT p FROM Product p
            WHERE p.active = true
              AND (LOWER(p.title)       LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.retailer)    LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    Page<Product> searchActive(@Param("q") String query, Pageable pageable);

    /** Active products marked as featured – order via Pageable's Sort. */
    Page<Product> findByActiveTrueAndFeaturedTrue(Pageable pageable);

    /** Atomically increment click_count for a product. */
    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.clickCount = p.clickCount + 1 WHERE p.id = :id")
    void incrementClickCount(@Param("id") Long id);
}
