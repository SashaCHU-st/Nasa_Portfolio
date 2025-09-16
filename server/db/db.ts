import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await pool.query('SELECT NOW()');
    // console.log("✅ DB connected at", res.rows[0].now);
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
})();
