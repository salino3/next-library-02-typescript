import "server-only";
import { Pool } from "pg";

// Connection DB if I need new API call in addition to Python backend
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

// 🛡️ SECURE: Specialized Read-Only Pool for Groq
export const readonlyPool = new Pool({
  connectionString: process.env.DATABASE_READONLY_URL,
});

export const aiQuery = (text: string, params?: any[]) =>
  readonlyPool.query(text, params);
