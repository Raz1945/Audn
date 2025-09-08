require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: process.env.DB_DRIVER || 'pg',
    connection: process.env.DATABASE_URL || {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    migrations: {
      directory: path.join(__dirname, 'app/database', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'app/database', 'seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon necesita SSL
    },
    migrations: {
      directory: path.join(__dirname, 'app/database', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'app/database', 'seeds'),
    },
  },
};
