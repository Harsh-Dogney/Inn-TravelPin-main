import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Importing Routes
import pinRoute from './Routes/pin.route.js';
import userRoute from './Routes/user.route.js';

// CORS configuration
const corsOptions = {
  origin: '*', // Allow frontend running on localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Initialize express app
const app = express();

// Apply CORS middleware (before any routes or other middleware)
app.use(cors(corsOptions)); // Apply CORS to all routes

dotenv.config();  
const PORT = process.env.PORT || 4001;  
const MongoDB = process.env.MongoURL;

// Use JSON middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MongoDB)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);  
  });

// API Routes
app.use("/api/pins", pinRoute); 
app.use("/api/user", userRoute);  

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
