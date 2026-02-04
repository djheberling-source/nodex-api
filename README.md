# nodex-api
Node.js (ES6+) + PostgreSQL + Elasticsearch + Docker, with JWT auth and Jest testing.

### pulling images
docker pull postgres:15
docker pull elasticsearch:8.12.0

### Run (Docker)
npm install
docker compose up --build

### Run (Local)
npm install
npm run dev