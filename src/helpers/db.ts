import { Pool } from "pg";

// تنظیمات دیتابیس
const pool = new Pool({
  user: "postgres",
  host: "192.168.1.4",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

export default pool;
