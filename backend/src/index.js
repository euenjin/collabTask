// backend/src/index.js
import 'dotenv/config';        // 1) load .env
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use((req,res,next) => {
  crossOriginIsolated.log('${new Date().toISOString()} - ${req.method} ${req.originalUrl}');
  next();
});

// 2) connect to MongoDB
connectDB();

// 3) middleware
app.use(cors());
app.use(express.json());

// 4) routes
app.use('/api/tasks', taskRoutes);

// 5) basic health check
app.get('/', (req, res) => {
  res.send('API is running');
});
// 6) error handler
app.use((err, req, res, next) => {
  console.error('Error handler causeht:',err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 7) start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});
