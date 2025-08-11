// backend/src/index.js
import 'dotenv/config';        // 1) load .env
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import signinRoutes from './routes/signInRoutes.js';
import signupRoutes from './routes/signUpRoutes.js';


const app = express();

app.use((req,res,next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// 2) middleware
app.use(cors({origin: process.env.CORS_ORIGIN || 'http://localhost:3000'}));
app.use(express.json());

// 3) routes
app.use('/api/auth', signinRoutes); 
app.use('/api/auth', signupRoutes); 
app.use('/api/tasks', taskRoutes);

// 4) error handler
app.use(errorHandler);

// 5) basic health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// 6) start server
const PORT = process.env.PORT || 4000;
const startServer = async () => {
  await connectDB();  // Connect to MongoDB
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
