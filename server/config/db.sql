-- Create database
CREATE DATABASE lux_beach_resort;

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
   PRIMARY KEY(id)
);

ALTER TABLE rooms
ADD COLUMN isBooked BOOLEAN DEFAULT false;

ALTER TABLE rooms
ALTER COLUMN isBooked SET NOT NULL ;

ALTER TABLE rooms 
RENAME COLUMN isBooked TO is_booked;

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
   phone VARCHAR(15) NOT NULL,
   email VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

ALTER TABLE guests 
ALTER COLUMN phone DROP NOT NULL;

ALTER TABLE guests
ADD COLUMN isAdmin BOOLEAN DEFAULT false;

-- Alter Table guests and add auth_provider_id and auth_provider_name columns
ALTER TABLE guests
ADD column auth_id VARCHAR(50) NOT NULL,
ADD column auth_provider_name VARCHAR(50) NOT NULL;

ALTER TABLE guests
RENAME COLUMN isAdmin TO is_admin;

ALTER TABLE guests
ADD COLUMN title VARCHAR(10);

ALTER TABLE guests 
ALTER COLUMN auth_id DROP NOT NULL;

ALTER TABLE guests 
ALTER COLUMN auth_provider_name DROP NOT NULL;

INSERT INTO guests
  ( name, phone, email )
VALUES
  ('John', '0459584949', 'john@yahoo.com'), 
  ('Jane', '0459584949', 'jane@yahoo.com'), 
  ('Billy', '0459584949', 'billy@yahoo.com'),
  ('Miranda', '0459584949', 'miranda@yahoo.com');

  UPDATE guests SET (name, phone, email, title) = ($1, $2, $3, $4)
  WHERE id = $5, [name, phone, email, title, id]


-- BOOKINGS -----------------------------------------------------
-- Create table Bookings
CREATE TABLE bookings (
   id SERIAL NOT NULL,
   room_id INT,
   guest_id INT,
   checkin_date DATE NOT NULL,
   checkout_date DATE NOT NULL,
   booked_date DATE NOT NULL DEFAULT CURRENT_DATE, 
   vacated BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY (id),
   CONSTRAINT room_id FOREIGN KEY(room_id) REFERENCES rooms(id),
   CONSTRAINT guest_id FOREIGN KEY(guest_id) REFERENCES guests(id)
);

ALTER TABLE bookings
ADD COLUMN is_paid BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE bookings
ADD COLUMN total_guest INT NOT NULL DEFAULT 1;

ALTER TABLE bookings
RENAME COLUMN total_guest TO total_guests;

ALTER TABLE bookings
ADD COLUMN paid_at TIMESTAMP;

ALTER TABLE bookings
ADD COLUMN total_amount DECIMAL(20,2);

ALTER TABLE bookings
ADD COLUMN notes VARCHAR(250);

INSERT INTO bookings 
   (room_id, guest_id, checkin_date, checkout_date)
VALUES
   (20, 1, '2020-12-7', '2020-12-9'),
   (20, 2, '2020-12-7', '2020-12-9'),
   (21, 3, '2020-12-7', '2020-12-9'),
   (22, 4, '2020-12-7', '2020-12-9');

   SELECT bookings.* , rooms.name as room_name, rooms.type as room_type, rooms.price as room_price
   FROM bookings
   JOIN rooms ON bookings.room_id = rooms.id
   WHERE bookings.id = 20;


   -- Check room availability based on checkInDate and checkOUtDate 
   SELECT * FROM bookings WHERE room_id = 5 AND ((@chekinDate >= checkin_date AND @checkinDate < checkout_date) OR (@checkoutDate > checkin_date AND @checkoutDate <= checkout_date ) );

   SELECT * FROM bookings WHERE room_id = $1 
      AND (
            ($2 >= checkin_date AND $2 < checkout_date)
             OR ($3 > checkin_date AND $3 <= checkout_date) 
             OR ($2 <= checkin_date AND $3 >= checkout_date)
         );

CASE
 WHEN rental_rate = 0.99 THEN true
	ELSE 0
END

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
   ('Italian', 'Spaghetti with Tomato Sauce', 20.0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg', 20, 'Napoletana sauce, garlic, cherry tomato, basil and parmesan.', false, true, true, true),
   ('Quick & Easy', 'Classic Hawaii', 15.0, 'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg', 10, '1 Slice White Bread, 1 Slice Ham, Pinapple Slice, Slice of Cheese and Butter', false, false, false, false),
   ('Hamburgers', 'Classic Hamburger', 14.5, 'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg', 45, '300g Cattle Hack, Tomato, Cucumber, Pickel, Onion and Ketchup', false, false, false, true);

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




