const { Pool } = require('pg');

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool =
  process.env.NODE_ENV === 'production' ? new Pool(prodConfig) : new Pool();

module.exports = {
  query: (text, values) => pool.query(text, values),
};
