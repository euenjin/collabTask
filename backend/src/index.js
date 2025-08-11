// backend/src/index.js
import 'dotenv/config';        // 1) load .env
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use((req,res,next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});


// 2) middleware
app.use(cors());
app.use(express.json());

// 3) routes
app.use('/api/tasks', taskRoutes);

// 4) basic health check
app.get('/', (req, res) => {
  res.send('API is running');
});
// 5) error handler
app.use((err, req, res, next) => {
  console.error('Error handler causeht:',err);
  res.status(500).json({ message: 'Internal Server Error' });
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
