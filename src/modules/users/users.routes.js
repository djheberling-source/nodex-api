import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { me } from "./users.controller.js";

export const usersRoutes = Router();

usersRoutes.get("/me", requireAuth, me);
