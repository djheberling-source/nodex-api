import express from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { searchRoutes } from "./modules/search/search.routes.js";
import { notFound, errorMiddleware } from "./middlewares/error.middleware.js";
import { pgHealth } from "./db/postgres.js";
import { esHealth } from "./clients/elasticsearch.js";

export const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
    const [pgOk, esOk] = await Promise.allSettled([pgHealth(), esHealth()]);
    res.json({
        status: "ok",
        postgres: pgOk.status === "fulfilled" ? pgOk.value : false,
        elasticsearch: esOk.status === "fulfilled" ? esOk.value : false
    });
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/search", searchRoutes);

app.use(notFound);
app.use(errorMiddleware);
