// All required imports for this module
import dotenv from 'dotenv';
import { Pool } from 'pg';
// load .env variables
dotenv.config();
export const {
  DEFAULT_DATABASE,
  PG_SERVER,
  PG_PORT,
  PG_DATABASE_DEV,
  PG_DATABASE_TEST,
  PG_USERNAME,
  PG_PASSWORD,
} = process.env;

// create instance of Pool
const pool = new Pool({
  host: PG_SERVER,
  port: parseInt(PG_PORT as string),
  user: PG_USERNAME,
  password: PG_PASSWORD,
  database: DEFAULT_DATABASE == 'dev' ? PG_DATABASE_DEV : PG_DATABASE_TEST,
});

// Define "errorHandlerCallback" function
const errorHandlerCallback = (error: Error): void => {
  console.log(error);
};
// invokes "errorHandlerCallback" function on error
pool.on('error', errorHandlerCallback);

export { pool };
