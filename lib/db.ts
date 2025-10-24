import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for neon
  },
});

export async function query(text: string, params?: string[]) {
  const res = await pool.query(text, params);
  return res;
}