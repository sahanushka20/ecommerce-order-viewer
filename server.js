import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectDB();

    // Middleware to parse JSON requests
    app.use(express.json());

    // Register routes
    app.use('/api/users', userRoutes);
    app.use('/api/orders', orderRoutes);

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
