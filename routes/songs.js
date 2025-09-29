const express = require('express');
const router = express.Router();

// GET all songs
router.get('/', (req, res) => {
  res.send('Get all songs - dummy response');
});

// GET a song by ID
router.get('/:id', (req, res) => {
  res.send(`Get song with ID ${req.params.id} - dummy response`);
});

// POST a new song
router.post('/', (req, res) => {
  res.send('Add a new song - dummy response');
});

// PUT (edit) a song by ID
router.put('/:id', (req, res) => {
  res.send(`Edit song with ID ${req.params.id} - dummy response`);
});

// DELETE a song by ID
router.delete('/:id', (req, res) => {
  res.send(`Delete song with ID ${req.params.id} - dummy response`);
});

module.exports = router;
