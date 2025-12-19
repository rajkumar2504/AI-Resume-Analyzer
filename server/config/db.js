const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL Connected');
    } catch (err) {
        console.error('PostgreSQL Connection Error:', err.message);
        // process.exit(1); // Don't exit for now, as we want the app to work without DB for the demo
    }
};

module.exports = { pool, connectDB };
