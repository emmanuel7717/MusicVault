const express = require('express');
const router = express.Router();
const model = require('./model');
const { songValidationRules, validate } = require('./middlewares/validation');

// GET all songs
router.get('/', (req, res) => {
  const songs = model.getAllSongs();
  res.status(200).json(songs);
});

// GET song by ID
router.get('/:id', (req, res) => {
  const song = model.getSongById(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.status(200).json(song);
});

// POST new song
router.post('/', songValidationRules, validate, (req, res) => {
  const newSong = model.addNewSong(req.body);
  res.status(201).json(newSong);
});

// PUT update song
router.put('/:id', songValidationRules, validate, (req, res) => {
  const updated = model.updateExistingSong(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Song not found' });
  res.status(200).json(updated);
});

// DELETE song
router.delete('/:id', (req, res) => {
  const success = model.deleteSong(req.params.id);
  if (!success) return res.status(404).json({ message: 'Song not found' });
  res.status(200).json({ message: 'Song deleted successfully' });
});

module.exports = router;
