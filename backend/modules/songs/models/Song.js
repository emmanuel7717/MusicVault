const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true, min: 0 },
  },
  { versionKey: false }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
