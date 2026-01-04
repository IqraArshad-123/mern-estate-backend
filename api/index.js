// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import uploadRoute from './routes/upload.route.js';
// import cors from 'cors';

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB!'))
//   .catch(err => console.log(err));

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());

// // 🔹 CORS configuration for local frontend

// app.use(cors({
//   origin: [
//     'http://localhost:5173', // local dev
//     // 'https://mern-estate-frontend-nine.vercel.app', // deployed frontend
//     'https://mern-estate-front-end.netlify.app'
  
//   ],
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   credentials: true
// }));



// // ROUTES
// app.use('/api/upload', uploadRoute);
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);

// // ERROR HANDLER
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// export default app;

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

const app = express();

/* 🔹 CORS – ALWAYS FIRST */
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


/* 🔹 Middlewares */
app.use(express.json());
app.use(cookieParser());

/* 🔹 MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log(err));

/* 🔹 Routes */
app.use('/api/upload', uploadRoute);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

/* 🔹 Error Handler */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

export default app;
