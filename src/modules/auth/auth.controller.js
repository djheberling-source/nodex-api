import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../config/env.js";
import { pool } from "../../db/postgres.js";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export async function register(req, res, next) {
    try {
        const { email, password } = registerSchema.parse(req.body);

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
            [email, passwordHash]
        );

        res.status(201).json(result.rows[0]);
    } catch (e) {
        // duplicate email
        if (String(e?.code) === "23505") {
            return res.status(409).json({ message: "Email already exists" });
        }
        next(e);
    }
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export async function login(req, res, next) {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const result = await pool.query(
            "SELECT id, email, password_hash FROM users WHERE email = $1 LIMIT 1",
            [email]
        );

        const user = result.rows[0];
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { sub: user.id, email: user.email },
            env.jwt.secret,
            { expiresIn: env.jwt.expiresIn }
        );

        res.json({ token });
    } catch (e) {
        next(e);
    }
}

/**
 * OAuth note (how to add later):
 * - Add /auth/oauth/:provider redirect
 * - Add /auth/oauth/:provider/callback
 * Recommended: passport + provider strategy (google/github)
 */
