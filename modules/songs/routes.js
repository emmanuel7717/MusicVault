// bring in express
const express = require('express');

// make a router to handle routes
const router = express.Router();

// bring in the model file that has all song functions
const model = require('./model');

// bring in validation 
const { songValidationRules, validate } = require('./middlewares/validation');


// get all songs
router.get('/', (req, res) => {
  // grab all songs from model
  const songs = model.getAllSongs();
  // send them back as json
  res.status(200).json(songs);
});

// get one song by id
router.get('/:id', (req, res) => {
  // find song that matches the id
  const song = model.getSongById(req.params.id);
  // if not found, send 404
  if (!song) return res.status(404).json({ message: 'Song not found' });
  // else send the song
  res.status(200).json(song);
});

// add new song
router.post('/', songValidationRules, validate, (req, res) => {
  // add song using data from body
  const newSong = model.addNewSong(req.body);
  // send back new song
  res.status(201).json(newSong);
});

// update song
router.put('/:id', songValidationRules, validate, (req, res) => {
  // update song with id and new info
  const updated = model.updateExistingSong(req.params.id, req.body);
  // if no song found, send 404
  if (!updated) return res.status(404).json({ message: 'Song not found' });
  // else send updated song
  res.status(200).json(updated);
});

// delete song
router.delete('/:id', (req, res) => {
  // try delete song by id
  const success = model.deleteSong(req.params.id);
  // if no song, 404
  if (!success) return res.status(404).json({ message: 'Song not found' });
  // else confirm delete
  res.status(200).json({ message: 'Song deleted successfully' });
});

// export router so app.js can use it
module.exports = router;
