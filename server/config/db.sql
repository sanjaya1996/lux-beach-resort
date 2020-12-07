-- Create database
CREATE DATABASE lux_beach_resort;

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

-- Create table Guests
CREATE TABLE guests (
   id SERIAL NOT NULL,
   name VARCHAR(100) NOT NULL,
   phone VARCHAR(15) NOT NULL,
   email VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

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


-- Create table Guests
CREATE TABLE guests (
   id SERIAL NOT NULL,
   name VARCHAR(100) NOT NULL,
   phone VARCHAR(15) NOT NULL,
   email VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

INSERT INTO guests
  ( name, phone, email )
VALUES
  ('John', '0459584949', 'john@yahoo.com'), 
  ('Jane', '0459584949', 'jane@yahoo.com'), 
  ('Billy', '0459584949', 'billy@yahoo.com'),
  ('Miranda', '0459584949', 'miranda@yahoo.com');

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

INSERT INTO bookings 
   (room_id, guest_id, checkin_date, checkout_date)
VALUES
   (20, 1, '2020-12-7', '2020-12-9'),
   (20, 2, '2020-12-7', '2020-12-9'),
   (21, 3, '2020-12-7', '2020-12-9'),
   (22, 4, '2020-12-7', '2020-12-9');