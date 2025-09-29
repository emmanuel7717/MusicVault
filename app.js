const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const songsRoutes = require('./routes/songs');
app.use('/songs', songsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to MusicVault - Phase 1');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
