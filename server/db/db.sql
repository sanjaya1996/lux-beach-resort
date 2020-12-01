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
   pets BOOLEAN NOT NULL DEFAULT FALSE,
   breakfast BOOLEAN NOT NULL DEFAULT FALSE,
   featured BOOLEAN NOT NULL DEFAULT FALSE,
   description TEXT NOT NULL,
   extras TEXT[],
   images VARCHAR(500)[],
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
