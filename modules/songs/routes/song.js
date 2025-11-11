const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// CREATE
router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all with search, sort, pagination
router.get('/', async (req, res) => {
  try {
    const { title, artist, genre, year, page = 1, limit = 10, sortBy = 'title' } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (artist) query.artist = { $regex: artist, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (year) query.year = year;

    const songs = await Song.find(query)
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
