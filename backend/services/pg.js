import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD || "",
  port: process.env.PG_PORT,
  allowExitOnIdle: true,
});

export default pool;
