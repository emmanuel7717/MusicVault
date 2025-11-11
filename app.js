

// bring in express
const express = require('express');
require('dotenv').config(); // load environment variables
const connectDB = require('./shared/middlewares/connect-db');

const app = express();
const PORT = process.env.PORT || 3000; // use PORT from .env or default 3000


connectDB();

app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use('/api/songs', require('./modules/songs/routes/song')); // matches your file

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// Error Handling Middleware

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server

app.listen(PORT, () => {
  console.log(`MusicVault backend running at http://localhost:${PORT}`);
});
