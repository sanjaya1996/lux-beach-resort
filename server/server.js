const express = require('express');
const mysql = require('mysql');

const ROOMS = require('./data/data');
const roomRoutes = require('./routes/roomRoutes');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxbeachresort',
});

// Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Mysql Connected...');
});

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create DB
app.get('/createdb', (req, res) => {
  //   let sql = `INSERT INTO users (first_name, last_name, email, password, location, dept,  is_admin, register_date) values ('Fred', 'Smith', 'fred@gmail.com', '123456', 'New York', 'design', 0, now()), ('Sara', 'Watson', 'sara@gmail.com', '123456', 'New York', 'design', 0, now()),('Will', 'Jackson', 'will@yahoo.com', '123456', 'Rhode Island', 'development', 1, now()),('Paula', 'Johnson', 'paula@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now()),('Tom', 'Spears', 'tom@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now());
  // `;
  // let sql = `CREATE TABLE users(
  //   id INT AUTO_INCREMENT,
  //      first_name VARCHAR(100),
  //      last_name VARCHAR(100),
  //      email VARCHAR(50),
  //      password VARCHAR(20),
  //      location VARCHAR(100),
  //      dept VARCHAR(100),
  //      is_admin TINYINT(1),
  //      register_date DATETIME,
  //      PRIMARY KEY(id)
  //   );`;
  // let sql = `INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date) values ('Brad', 'Traversy', 'brad@gmail.com', '123456','Massachusetts', 'development', 1, now());
  //  `;
  // let sql = `INSERT INTO users (first_name, last_name, email, password, location, dept,  is_admin, register_date) values ('Fred', 'Smith', 'fred@gmail.com', '123456', 'New York', 'design', 0, now()), ('Sara', 'Watson', 'sara@gmail.com', '123456', 'New York', 'design', 0, now()),('Will', 'Jackson', 'will@yahoo.com', '123456', 'Rhode Island', 'development', 1, now()),('Paula', 'Johnson', 'paula@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now()),('Tom', 'Spears', 'tom@yahoo.com', '123456', 'Massachusetts', 'sales', 0, now());
  //  `;
  // let sql = `CREATE TABLE posts(
  //   id INT AUTO_INCREMENT,
  //      user_id INT,
  //      title VARCHAR(100),
  //      body TEXT,
  //      publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  //      PRIMARY KEY(id),
  //      FOREIGN KEY (user_id) REFERENCES users(id)
  //   );`;
  // let sql = `INSERT INTO posts(user_id, title, body) VALUES (1, 'Post One', 'This is post one'),(3, 'Post Two', 'This is post two'),(1, 'Post Three', 'This is post three'),(2, 'Post Four', 'This is post four'),(5, 'Post Five', 'This is post five'),(4, 'Post Six', 'This is post six'),(2, 'Post Seven', 'This is post seven'),(1, 'Post Eight', 'This is post eight'),(3, 'Post Nine', 'This is post none'),(4, 'Post Ten', 'This is post ten');
  // `;

  // let sql = `CREATE TABLE comments(
  //   id INT AUTO_INCREMENT,
  //     post_id INT,
  //     user_id INT,
  //     body TEXT,
  //     publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     PRIMARY KEY(id),
  //     FOREIGN KEY(user_id) references users(id),
  //     FOREIGN KEY(post_id) references posts(id)
  // );
  // `;

  // let sql = `INSERT INTO comments(post_id, user_id, body) VALUES (1, 3, 'This is comment one'),(2, 1, 'This is comment two'),(5, 3, 'This is comment three'),(2, 4, 'This is comment four'),(1, 2, 'This is comment five'),(3, 1, 'This is comment six'),(3, 2, 'This is comment six'),(5, 4, 'This is comment seven'),(2, 3, 'This is comment seven');
  // `;

  let sql = `SELECT
  users.id,
  users.first_name,
  users.last_name,
  array_id(comments.body) AS comments,
  posts.title
  FROM comments
  INNER JOIN posts on posts.id = comments.post_id
  INNER JOIN users on users.id = comments.user_id
  ORDER BY posts.title;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Room routes
app.use('/api/rooms', roomRoutes);

app.listen(5000, console.log('Server running on port 5000'));
