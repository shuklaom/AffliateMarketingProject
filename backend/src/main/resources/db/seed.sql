-- ──────────────────────────────────────────────────────────────────────
--  Everyday Deals – database bootstrap
--
--  Run once to create the database, then let Hibernate manage the schema.
--  (spring.jpa.hibernate.ddl-auto=update will create / alter tables.)
-- ──────────────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS everydaydeals
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE everydaydeals;

-- Optional: seed a few sample products so the frontend has something to show.
INSERT INTO products
    (title, description, price, original_price, image_url, affiliate_url, retailer, category, is_active, created_at, updated_at)
VALUES
    ('Sony WH-1000XM5 Headphones',
     'Industry-leading noise cancellation with 30-hour battery life.',
     279.99, 349.99,
     'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
     'https://example.com/aff/sony-wh1000xm5',
     'Amazon', 'Electronics', true, NOW(), NOW()),

    ('Apple AirPods Pro (2nd Gen)',
     'Active noise cancellation, Adaptive Transparency, and Personalized Spatial Audio.',
     189.00, 249.00,
     'https://images.unsplash.com/photo-1572541-7510-d8b4-6b7a-6e7a3b5e4b5e?w=400',
     'https://example.com/aff/airpods-pro-2',
     'Best Buy', 'Electronics', true, NOW(), NOW()),

    ('Instant Pot Duo 7-in-1',
     'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker & warmer.',
     79.95, 99.95,
     'https://images.unsplash.com/photo-1585515656981-eefa86c4ea88?w=400',
     'https://example.com/aff/instant-pot-duo',
     'Amazon', 'Kitchen', true, NOW(), NOW()),

    ('Nike Air Zoom Pegasus 40',
     'Responsive cushioning and a breathable upper for everyday running.',
     89.97, 130.00,
     'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
     'https://example.com/aff/nike-pegasus-40',
     'Nike', 'Fashion', true, NOW(), NOW()),

    ('Kindle Paperwhite (16 GB)',
     'Waterproof, glare-free display with weeks of battery life.',
     109.99, 139.99,
     'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
     'https://example.com/aff/kindle-paperwhite',
     'Amazon', 'Books', true, NOW(), NOW()),

    ('LEGO Technic Lamborghini',
     '3696-piece replica of the Lamborghini Sián FKP 37 with working gearbox.',
     349.99, 379.99,
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
     'https://example.com/aff/lego-lamborghini',
     'Target', 'Toys', true, NOW(), NOW()),

    ('Fitbit Charge 6',
     'Built-in GPS, Google Maps & Wallet, 7-day battery, heart rate monitoring.',
     139.95, 159.95,
     'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
     'https://example.com/aff/fitbit-charge-6',
     'Walmart', 'Electronics', true, NOW(), NOW()),

    ('The 48 Laws of Power – Robert Greene',
     'International bestseller on power dynamics and strategy.',
     14.99, 22.00,
     'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
     'https://example.com/aff/48-laws-of-power',
     'Amazon', 'Books', true, NOW(), NOW());
