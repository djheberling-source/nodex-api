import "dotenv/config";

export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 3000),

    postgres: {
        host: process.env.POSTGRES_HOST ?? "localhost",
        port: Number(process.env.POSTGRES_PORT ?? 5432),
        db: process.env.POSTGRES_DB ?? "nodexdb",
        user: process.env.POSTGRES_USER ?? "nodex",
        password: process.env.POSTGRES_PASSWORD ?? "nodexpass"
    },

    elastic: {
        node: process.env.ELASTICSEARCH_NODE ?? "http://localhost:9200"
    },

    jwt: {
        secret: process.env.JWT_SECRET ?? "dev_secret",
        expiresIn: process.env.JWT_EXPIRES_IN ?? "1h"
    }
};