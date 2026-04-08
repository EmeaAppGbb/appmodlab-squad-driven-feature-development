-- ShopSmart Seed Data

-- Seed users (20 users)
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('alice.johnson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Alice', 'Johnson'),
('bob.smith@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Bob', 'Smith'),
('carol.williams@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Carol', 'Williams'),
('david.brown@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'David', 'Brown'),
('emma.davis@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Emma', 'Davis'),
('frank.miller@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Frank', 'Miller'),
('grace.wilson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Grace', 'Wilson'),
('henry.moore@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Henry', 'Moore'),
('iris.taylor@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Iris', 'Taylor'),
('jack.anderson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Jack', 'Anderson'),
('karen.thomas@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Karen', 'Thomas'),
('leo.jackson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Leo', 'Jackson'),
('maria.white@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Maria', 'White'),
('nathan.harris@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Nathan', 'Harris'),
('olivia.martin@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Olivia', 'Martin'),
('paul.thompson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Paul', 'Thompson'),
('quinn.garcia@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Quinn', 'Garcia'),
('rachel.martinez@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Rachel', 'Martinez'),
('samuel.robinson@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Samuel', 'Robinson'),
('tina.clark@example.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Tina', 'Clark');

-- Seed products (50 products across categories)

-- Electronics (15 products)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('iPhone 15 Pro', 'Latest Apple flagship with A17 Pro chip and titanium design', 999.00, 'Electronics', 50, 'https://example.com/iphone15.jpg'),
('Samsung Galaxy S24', 'Powerful Android smartphone with AI features', 899.00, 'Electronics', 45, 'https://example.com/galaxy-s24.jpg'),
('MacBook Air M3', 'Ultra-thin laptop with M3 chip and all-day battery', 1299.00, 'Electronics', 30, 'https://example.com/macbook-air.jpg'),
('Dell XPS 13', 'Premium Windows laptop with InfinityEdge display', 1099.00, 'Electronics', 25, 'https://example.com/dell-xps.jpg'),
('Sony WH-1000XM5', 'Industry-leading noise canceling wireless headphones', 399.00, 'Electronics', 100, 'https://example.com/sony-headphones.jpg'),
('AirPods Pro 2', 'Active noise cancellation with spatial audio', 249.00, 'Electronics', 150, 'https://example.com/airpods-pro.jpg'),
('iPad Air', 'Powerful tablet with M1 chip and Apple Pencil support', 599.00, 'Electronics', 60, 'https://example.com/ipad-air.jpg'),
('Samsung Galaxy Tab S9', 'Premium Android tablet with S Pen included', 749.00, 'Electronics', 40, 'https://example.com/galaxy-tab.jpg'),
('Apple Watch Series 9', 'Advanced health and fitness tracking smartwatch', 399.00, 'Electronics', 80, 'https://example.com/apple-watch.jpg'),
('Kindle Paperwhite', 'Waterproof e-reader with adjustable warm light', 139.00, 'Electronics', 120, 'https://example.com/kindle.jpg'),
('DJI Mini 3 Pro', 'Lightweight camera drone with 4K video', 759.00, 'Electronics', 20, 'https://example.com/dji-mini.jpg'),
('GoPro HERO12', 'Action camera with 5.3K video and waterproof design', 399.00, 'Electronics', 35, 'https://example.com/gopro.jpg'),
('Nintendo Switch OLED', 'Handheld gaming console with vibrant OLED screen', 349.00, 'Electronics', 70, 'https://example.com/switch.jpg'),
('PlayStation 5', 'Next-gen gaming console with 4K graphics', 499.00, 'Electronics', 25, 'https://example.com/ps5.jpg'),
('Logitech MX Master 3S', 'Premium wireless mouse for productivity', 99.00, 'Electronics', 90, 'https://example.com/logitech-mouse.jpg');

-- Books (15 products)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Atomic Habits', 'James Clear - Transform your habits and achieve remarkable results', 16.99, 'Books', 200, 'https://example.com/atomic-habits.jpg'),
('The Psychology of Money', 'Morgan Housel - Timeless lessons on wealth and happiness', 14.99, 'Books', 180, 'https://example.com/psychology-money.jpg'),
('Thinking, Fast and Slow', 'Daniel Kahneman - The two systems that drive how we think', 18.99, 'Books', 150, 'https://example.com/thinking-fast-slow.jpg'),
('Sapiens', 'Yuval Noah Harari - A brief history of humankind', 19.99, 'Books', 175, 'https://example.com/sapiens.jpg'),
('Educated', 'Tara Westover - A memoir about education and self-invention', 15.99, 'Books', 140, 'https://example.com/educated.jpg'),
('The Midnight Library', 'Matt Haig - Between life and death is a library of infinite possibilities', 14.99, 'Books', 190, 'https://example.com/midnight-library.jpg'),
('Project Hail Mary', 'Andy Weir - A lone astronaut must save Earth', 17.99, 'Books', 160, 'https://example.com/project-hail-mary.jpg'),
('Clean Code', 'Robert Martin - A handbook of agile software craftsmanship', 39.99, 'Books', 95, 'https://example.com/clean-code.jpg'),
('Designing Data-Intensive Applications', 'Martin Kleppmann - The big ideas behind reliable systems', 49.99, 'Books', 85, 'https://example.com/data-intensive.jpg'),
('The Pragmatic Programmer', 'David Thomas - Your journey to mastery', 44.99, 'Books', 90, 'https://example.com/pragmatic-programmer.jpg'),
('Deep Work', 'Cal Newport - Rules for focused success in a distracted world', 16.99, 'Books', 170, 'https://example.com/deep-work.jpg'),
('Zero to One', 'Peter Thiel - Notes on startups and building the future', 18.99, 'Books', 155, 'https://example.com/zero-to-one.jpg'),
('The Lean Startup', 'Eric Ries - How constant innovation creates radically successful businesses', 17.99, 'Books', 145, 'https://example.com/lean-startup.jpg'),
('Dune', 'Frank Herbert - Epic science fiction masterpiece', 19.99, 'Books', 165, 'https://example.com/dune.jpg'),
('The Lord of the Rings', 'J.R.R. Tolkien - Complete trilogy in one volume', 29.99, 'Books', 130, 'https://example.com/lotr.jpg');

-- Clothing (10 products)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Levi''s 501 Original Jeans', 'Classic straight fit denim jeans', 69.99, 'Clothing', 120, 'https://example.com/levis-501.jpg'),
('Nike Air Max 90', 'Iconic running shoes with visible Air cushioning', 129.99, 'Clothing', 85, 'https://example.com/air-max.jpg'),
('Adidas Ultraboost', 'Premium running shoes with Boost cushioning', 149.99, 'Clothing', 70, 'https://example.com/ultraboost.jpg'),
('North Face Thermoball Jacket', 'Lightweight insulated jacket for outdoor adventures', 199.99, 'Clothing', 50, 'https://example.com/thermoball.jpg'),
('Patagonia Better Sweater', 'Warm fleece pullover made from recycled materials', 139.99, 'Clothing', 60, 'https://example.com/better-sweater.jpg'),
('Uniqlo Heattech Shirt', 'Thermal base layer for cold weather', 19.99, 'Clothing', 200, 'https://example.com/heattech.jpg'),
('Columbia Rain Jacket', 'Waterproof shell for rainy days', 89.99, 'Clothing', 80, 'https://example.com/columbia-rain.jpg'),
('Carhartt Work Pants', 'Durable canvas pants for tough jobs', 59.99, 'Clothing', 100, 'https://example.com/carhartt-pants.jpg'),
('Tommy Hilfiger Polo Shirt', 'Classic cotton polo with signature logo', 49.99, 'Clothing', 150, 'https://example.com/hilfiger-polo.jpg'),
('Ray-Ban Wayfarer Sunglasses', 'Iconic acetate sunglasses with UV protection', 159.99, 'Clothing', 90, 'https://example.com/wayfarer.jpg');

-- Home (5 products)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 649.99, 'Home', 40, 'https://example.com/dyson-v15.jpg'),
('Instant Pot Duo', '7-in-1 electric pressure cooker for quick meals', 99.99, 'Home', 110, 'https://example.com/instant-pot.jpg'),
('Nespresso VertuoPlus', 'Coffee and espresso machine with one-touch brewing', 179.99, 'Home', 65, 'https://example.com/nespresso.jpg'),
('Philips Hue Starter Kit', 'Smart LED light bulbs with app control', 129.99, 'Home', 75, 'https://example.com/philips-hue.jpg'),
('iRobot Roomba j7+', 'Self-emptying robot vacuum with obstacle avoidance', 799.99, 'Home', 30, 'https://example.com/roomba-j7.jpg');

-- Sports (5 products)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Bowflex SelectTech Dumbbells', 'Adjustable dumbbells from 5 to 52.5 lbs', 349.99, 'Sports', 45, 'https://example.com/bowflex-dumbbells.jpg'),
('Peloton Bike', 'Indoor cycling bike with live streaming classes', 1445.00, 'Sports', 15, 'https://example.com/peloton.jpg'),
('Garmin Forerunner 265', 'GPS running watch with AMOLED display', 449.99, 'Sports', 55, 'https://example.com/garmin-265.jpg'),
('Hydro Flask Water Bottle', 'Insulated stainless steel bottle keeps drinks cold 24hrs', 44.95, 'Sports', 200, 'https://example.com/hydro-flask.jpg'),
('Manduka PRO Yoga Mat', 'Premium yoga mat with lifetime guarantee', 120.00, 'Sports', 80, 'https://example.com/manduka-mat.jpg');

-- Seed orders (100 orders)
-- Generate realistic order patterns across users
DO $$
DECLARE
    user_id_var INTEGER;
    product_id_var INTEGER;
    quantity_var INTEGER;
    order_id_var INTEGER;
    product_price DECIMAL(10, 2);
    order_total DECIMAL(10, 2);
    status_var VARCHAR(20);
    i INTEGER;
    j INTEGER;
    num_items INTEGER;
BEGIN
    FOR i IN 1..100 LOOP
        -- Random user
        user_id_var := 1 + floor(random() * 20)::INTEGER;
        
        -- Random status distribution
        CASE floor(random() * 5)::INTEGER
            WHEN 0 THEN status_var := 'pending';
            WHEN 1 THEN status_var := 'processing';
            WHEN 2 THEN status_var := 'shipped';
            WHEN 3 THEN status_var := 'delivered';
            ELSE status_var := 'delivered';
        END CASE;
        
        order_total := 0;
        
        -- Random number of items (1-5)
        num_items := 1 + floor(random() * 5)::INTEGER;
        
        -- Create order first to get ID
        INSERT INTO orders (user_id, total_amount, status, created_at)
        VALUES (
            user_id_var,
            0, -- Will update after calculating total
            status_var,
            CURRENT_TIMESTAMP - (random() * INTERVAL '90 days')
        )
        RETURNING id INTO order_id_var;
        
        -- Add items to order
        FOR j IN 1..num_items LOOP
            -- Random product
            product_id_var := 1 + floor(random() * 50)::INTEGER;
            quantity_var := 1 + floor(random() * 3)::INTEGER;
            
            -- Get product price
            SELECT price INTO product_price FROM products WHERE id = product_id_var;
            
            -- Add to order total
            order_total := order_total + (product_price * quantity_var);
            
            -- Insert order item
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (order_id_var, product_id_var, quantity_var, product_price);
        END LOOP;
        
        -- Update order total
        UPDATE orders SET total_amount = order_total WHERE id = order_id_var;
    END LOOP;
END $$;
