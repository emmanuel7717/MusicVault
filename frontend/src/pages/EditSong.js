import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSongs, updateSong } from "../api/songApi";

function EditSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({ title: "", artist: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await getSongs();
        const songData = res.data.find((s) => s._id === id);
        if (songData) setSong({ title: songData.title, artist: songData.artist });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch song.");
      }
    };
    fetchSong();
  }, [id]);

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
      await updateSong(id, song);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error updating song.");
    }
  };

  return (
    <div>
      <h2>Edit Song</h2>
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
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
}

export default EditSong;
