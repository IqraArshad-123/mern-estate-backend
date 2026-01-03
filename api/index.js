import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import uploadRoute from './routes/upload.route.js';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// 🔹 CORS configuration for local frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // for local development
    'https://mern-estate-frontend-nine.vercel.app' // deployed frontend
  ],
  credentials: true
}));


// ROUTES
app.use('/api/upload', uploadRoute);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// START SERVER
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
