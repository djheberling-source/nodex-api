CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (email, password_hash)
VALUES ('demo@atlas.local', '$2b$10$8V0oZr0gS2m4wQJm5rVt6e5kYy3P0kOQy9y7b5jHkSg8l8b0dG2mK')
ON CONFLICT (email) DO NOTHING;
