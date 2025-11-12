const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { songValidationRules, validate } = require('../middlewares/validation');

console.log('songs router file loaded'); // <-- ADDED

// quick test route (no changes elsewhere)
router.get('/ping', (req, res) => {         // <-- ADDED
  res.json({ ok: true, where: '/api/songs/ping' });
});

// CREATE
router.post('/', songValidationRules, validate, async (req, res) => {
  try {
    const doc = await Song.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (list) with search/sort/pagination
router.get('/', async (req, res) => {
  try {
    const { q, genre, artist, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { title:  { $regex: q, $options: 'i' } },
        { artist: { $regex: q, $options: 'i' } },
        { album:  { $regex: q, $options: 'i' } },
        { genre:  { $regex: q, $options: 'i' } },
      ];
    }
    if (genre) filter.genre = genre;
    if (artist) filter.artist = artist;

    const sortObj = { [sort]: order === 'asc' ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Song.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Song.countDocuments(filter),
    ]);

    res.json({
      items,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (by id)
router.get('/:id', async (req, res) => {
  try {
    const doc = await Song.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Song not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', songValidationRules, validate, async (req, res) => {
  try {
    const doc = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Song not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const doc = await Song.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
