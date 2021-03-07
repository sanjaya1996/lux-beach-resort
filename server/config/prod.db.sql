-- ROOMS -----------------------------------------------
-- Create table room
CREATE TABLE rooms (
   id SERIAL NOT NULL,
   name VARCHAR(100) NOT NULL,
   type VARCHAR(50) NOT NULL,
   price DECIMAL(20,2) NOT NULL,
   size DECIMAL(20,2) NOT NULL,
   capacity INT NOT NULL,
   pets BOOLEAN NOT NULL DEFAULT false,
   breakfast BOOLEAN NOT NULL DEFAULT false,
   featured BOOLEAN NOT NULL DEFAULT false,
   description TEXT NOT NULL,
   extras TEXT[],
   images VARCHAR(500)[],
   is_booked BOOLEAN NOT NULL DEFAULT false,
   PRIMARY KEY(id)
);


-- Insert first Value into rooms

INSERT INTO rooms (id, name, type, price, size, capacity, pets, breakfast, featured, description, extras, images) 
values (
    2020,
    'single economy',
    'single',
    100,
    200,
    1,
    false,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-1.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
);

-- Insert other Values into rooms

INSERT INTO rooms (name, type, price, size, capacity, pets, breakfast, featured, description, extras, images) 
values (
    'single basic',
    'single',
    150,
    250,
    1,
    false,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-2.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
), 
(
    'single standard',
    'single',
    250,
    300,
    1,
    true,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-3.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'single delux',
    'single',
    300,
    400,
    1,
    true,
    true,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-4.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'double economy',
    'double',
    200,
    300,
    2,
    false,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-5.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'double basic',
    'double',
    250,
    350,
    2,
    false,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-6.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'double standard',
    'double',
    300,
    400,
    2,
    true,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-7.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'double delux',
    'double',
    400,
    500,
    2,
    true,
    true,
    true,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-8.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'double delux',
    'double',
    400,
    500,
    2,
    true,
    true,
    true,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-9.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'family basic',
    'family',
    350,
    550,
    4,
    false,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-10.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'family standard',
    'family',
    400,
    600,
    5,
    true,
    false,
    false,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-11.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'family delux',
    'family',
    500,
    700,
    6,
    true,
    true,
    true,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-12.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
),
(
    'presidential',
    'presidential',
    600,
    1000,
    10,
    true,
    true,
    true,
    'Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.',
    ARRAY['Plush pillows and breathable bed linens',
      'Soft, oversized bath towels',
      'Full-sized, pH-balanced toiletries',
      'Complimentary refreshments',
      'Adequate safety/security',
      'Internet',
      'Comfortable beds'
    ],
    ARRAY[
       '/images/room-1.jpeg',
       '/images/details-1.jpeg',
       '/images/details-3.jpeg',
       '/images/details-4.jpeg'
    ]
);


-- GUESTS ..............................................

-- Create table Guests
CREATE TABLE guests (
   id SERIAL NOT NULL,
   name VARCHAR(100) NOT NULL,
   phone VARCHAR(15),
   email VARCHAR(50) NOT NULL,
   title VARCHAR(10),
   is_Admin BOOLEAN DEFAULT false,
   auth_id VARCHAR(50),
   auth_provider_name VARCHAR(50),
   PRIMARY KEY(id)
);

INSERT INTO guests
  ( name, phone, email )
VALUES
  ('John', '0459584949', 'john@yahoo.com'), 
  ('Jane', '0459584949', 'jane@yahoo.com'), 
  ('Billy', '0459584949', 'billy@yahoo.com'),
  ('Miranda', '0459584949', 'miranda@yahoo.com');


  -- BOOKINGS -----------------------------------------------------
-- Create table Bookings
CREATE TABLE bookings (
   id SERIAL NOT NULL,
   room_id INT,
   guest_id INT,
   checkin_date DATE NOT NULL,
   checkout_date DATE NOT NULL,
   booked_date DATE NOT NULL DEFAULT CURRENT_DATE, 
   total_guests INT NOT NULL DEFAULT 1,
   is_paid BOOLEAN NOT NULL DEFAULT false,
   paid_at TIMESTAMP,
   total_amount DECIMAL(20,2),
   notes VARCHAR(250),
   vacated BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY (id),
   CONSTRAINT room_id FOREIGN KEY(room_id) REFERENCES rooms(id),
   CONSTRAINT guest_id FOREIGN KEY(guest_id) REFERENCES guests(id)
);

-- MEALS ................................................
-- Create Table Meals

CREATE TABLE meals (
   id SERIAL NOT NULL,
   category VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   price DECIMAL(20,2) NOT NULL,
   imageUrl VARCHAR(1000) NOT NULL,
   duration INT NOT NULL,
   ingredients VARCHAR(150),
   is_gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
   is_vegan BOOLEAN NOT NULL DEFAULT FALSE,
   is_vegeterian BOOLEAN NOT NULL DEFAULT FALSE,
   is_lactose_free BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY (id)
);

INSERT INTO meals 
   (category, name, price, imageUrl, duration, ingredients, is_gluten_free, is_vegan, is_vegeterian, is_lactose_free)
VALUES
   ('Salmon Fish', 'Salmon Fish', 34.50, '/uploads\mealImage-1610490698463.jpg', 20, '350 gm grilled Salmon, Tossed Crisp vegetables in a tangy Lemon basil dressing.', true, false, false, true),
   ('Italian', 'Spaghetti with Tomato Sauce', 20.0, '/images/meals/meal-spaghettiBolognese.jpg', 20, 'Napoletana sauce, garlic, cherry tomato, basil and parmesan.', false, true, true, true),
   ('Quick & Easy', 'Classic Hawaii', 15.0, '/images/meals/meal-classicHawai.jpg', 10, '1 Slice White Bread, 1 Slice Ham, Pinapple Slice, Slice of Cheese and Butter', false, false, false, false),
   ('Hamburgers', 'Classic Hamburger', 14.5, '/images/meals/meal-classicHamburger.jpg', 45, '300g Cattle Hack, Tomato, Cucumber, Pickel, Onion and Ketchup', false, false, false, true);

-- ORDERS ................................................
-- Create Table  Orders

CREATE TABLE orders (
   id SERIAL NOT NULL,
   guest_id INT,
   pickup_time TIMESTAMP NOT NULL,
   ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   pickup_note VARCHAR(250),
   total_amount DECIMAL(20,2) NOT NULL,
   is_pickedup BOOLEAN NOT NULL DEFAULT FALSE,
   is_paid BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY (id),
   CONSTRAINT guest_id FOREIGN KEY(guest_id) REFERENCES guests(id)
);

INSERT INTO orders
   (guest_id, pickup_time, pickup_note, total_amount, is_paid)
VALUES
   (29, CURRENT_TIMESTAMP, 'This is the pickup not for my order', 40.50, true );

   -- MEALS ORDERS (many-to-many resolve table) ................................................
-- Create Table  meals_orders

CREATE TABLE meals_orders (
   order_id INT,
   meal_id INT,
   quantity INT NOT NULL DEFAULT 1,
   PRIMARY KEY (meal_id, order_id),
   CONSTRAINT meal_id FOREIGN KEY(meal_id) REFERENCES meals(id),
   CONSTRAINT order_id FOREIGN KEY(order_id) REFERENCES orders(id)
);

INSERT INTO meals_orders
   (order_id, meal_id, quantity )
VALUES
(1, 2, 2),
(1, 3, 3);