// All required imports for this module
import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/user.routes';
import { productRoutes } from './routes/product.routes';
import { orderRoutes } from './routes/order.routes';
// load .env variables
dotenv.config();

// Create instance of expess app
const app: Application = express();

const { SERVER_PORT } = process.env;
// set the port
const port = SERVER_PORT || 3000;

// Add milddlwares and routes
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);

// Define Server callback function
const listeningCallback = (): void => {
  console.log(`Server is running on port: ${port}`);
};

// Build the local server
app.listen(port, listeningCallback);

export default app;
