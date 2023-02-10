-- Create the table "users"
CREATE TABLE IF NOT EXISTS users (
  id              SERIAL PRIMARY KEY,
  firstname       VARCHAR(60) NOT NULL,
  lastname        VARCHAR(60) NOT NULL,
  username        VARCHAR(50) NOT NULL UNIQUE,
  password        VARCHAR(200) NOT NULL
);