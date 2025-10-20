const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../../data/songs.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

function getAllSongs() {
  return readData();
}

function getSongById(id) {
  const songs = readData();
  return songs.find((s) => s.id === id);
}

function addNewSong(data) {
  const songs = readData();
  const newSong = { id: uuidv4(), ...data };
  songs.push(newSong);
  writeData(songs);
  return newSong;
}

function updateExistingSong(id, data) {
  const songs = readData();
  const index = songs.findIndex((s) => s.id === id);
  if (index === -1) return null;
  songs[index] = { ...songs[index], ...data };
  writeData(songs);
  return songs[index];
}

function deleteSong(id) {
  const songs = readData();
  const filtered = songs.filter((s) => s.id !== id);
  if (filtered.length === songs.length) return false;
  writeData(filtered);
  return true;
}

module.exports = {
  getAllSongs,
  getSongById,
  addNewSong,
  updateExistingSong,
  deleteSong,
};
