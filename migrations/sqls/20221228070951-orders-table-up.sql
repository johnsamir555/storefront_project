-- Create the type "status_type"
CREATE TYPE status_type AS ENUM ('active', 'complete');
-- Create the table "orders"
CREATE TABLE IF NOT EXISTS orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  status  status_type NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);