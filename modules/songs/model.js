// bring in needed modules
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// path to the songs data file
const dataPath = path.join(__dirname, '../../data/songs.json');

// read songs file and turn it into js object
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// write updated songs back to file
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// get all songs
function getAllSongs() {
  return readData();
}

// get one song by id
function getSongById(id) {
  const songs = readData();
  return songs.find((s) => s.id === id);
}

// add new song
function addNewSong(data) {
  const songs = readData();
  // make new song with random id
  const newSong = { id: uuidv4(), ...data };
  // push it to list
  songs.push(newSong);
  // save to file
  writeData(songs);
  return newSong;
}

// update a song by id
function updateExistingSong(id, data) {
  const songs = readData();
  // find song index
  const index = songs.findIndex((s) => s.id === id);
  if (index === -1) return null; // not found
  // update song info
  songs[index] = { ...songs[index], ...data };
  // save back to file
  writeData(songs);
  return songs[index];
}

// delete a song by id
function deleteSong(id) {
  const songs = readData();
  // filter out the song
  const filtered = songs.filter((s) => s.id !== id);
  // if nothing changed, song not found
  if (filtered.length === songs.length) return false;
  // save new list
  writeData(filtered);
  return true;
}

// export all functions so other files can use them
module.exports = {
  getAllSongs,
  getSongById,
  addNewSong,
  updateExistingSong,
  deleteSong,
};
