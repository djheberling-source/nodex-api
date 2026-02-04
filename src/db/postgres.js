import pg from "pg";
import { env } from "../config/env.js";

export const pool = new pg.Pool({
    host: env.postgres.host,
    port: env.postgres.port,
    database: env.postgres.db,
    user: env.postgres.user,
    password: env.postgres.password
});

export async function pgHealth() {
    const res = await pool.query("SELECT 1 as ok");
    return res.rows?.[0]?.ok === 1;
}