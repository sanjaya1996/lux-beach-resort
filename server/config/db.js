const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  query: (text, values) => pool.query(text, values),
};
