import { pool } from "../../db/postgres.js";

export async function me(req, res, next) {
    try {
        const userId = req.user?.sub;

        const result = await pool.query(
            "SELECT id, email, created_at FROM users WHERE id = $1",
            [userId]
        );

        const user = result.rows[0];
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (e) {
        next(e);
    }
}