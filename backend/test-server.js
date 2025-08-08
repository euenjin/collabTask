// backend/test-server.js
import express from 'express';

console.log('⚡️ test-server.js loaded');

const app = express();

app.get('/', (req, res) => {
  console.log('⚡️ GET / received');
  res.send('Test server is running');
});

app.listen(4000, () => console.log('⚡️ Test server listening on port 4000'));
