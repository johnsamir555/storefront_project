-- Create table "products"
CREATE TABLE IF NOT EXISTS products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(60) NOT NULL,
  price INTEGER NOT NULL
);