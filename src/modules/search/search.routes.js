import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { indexDoc, search } from "./search.controller.js";

export const searchRoutes = Router();

searchRoutes.post("/index", requireAuth, indexDoc);
searchRoutes.get("/", search);
