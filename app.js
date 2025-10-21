// bring in express
const express = require('express');
const app = express();
const PORT = 3000; // server runs on this port

// lets app read json data
app.use(express.json());

// lets app read form data too
app.use(express.urlencoded({ extended: true }));

// main route for songs
app.use('/api/songs', require('./modules/songs/routes'));

// if no route found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// handles any server error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// start the server
app.listen(PORT, () => {
  console.log(`MusicVault backend running at http://localhost:${PORT}`);
});
