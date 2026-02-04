export function notFound(req, res) {
    res.status(404).json({ message: "Route not found" });
}

export function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV !== "test") {
        console.error("❌ Error:", err);
    }

    res.status(status).json({ message });
}