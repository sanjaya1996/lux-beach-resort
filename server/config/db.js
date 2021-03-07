const { Pool } = require('pg');

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool =
  process.env.NODE_ENV === 'development' ? new Pool() : new Pool(prodConfig);

module.exports = {
  query: (text, values) => pool.query(text, values),
};
