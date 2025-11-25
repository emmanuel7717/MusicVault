import React, { useState } from "react";
import { addSong } from "../api/songApi";
import { useNavigate } from "react-router-dom";

function AddSong() {
  const [song, setSong] = useState({ title: "", artist: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!song.title || !song.artist) {
      setError("Both title and artist are required!");
      return;
    }

    try {
      await addSong(song);
      navigate("/");
    } catch (err) {
      setError("Error adding song. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add New Song</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={song.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={song.artist}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
}

export default AddSong;
