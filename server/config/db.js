const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = isProduction ? new Pool(prodConfig) : new Pool();

module.exports = {
  query: (text, values) => pool.query(text, values),
};
