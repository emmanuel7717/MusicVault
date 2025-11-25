import React, { useEffect, useState } from "react";
import { getSongs, deleteSong } from "../api/songApi";
import { Link } from "react-router-dom";

function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await getSongs();
      setSongs(res.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await deleteSong(id);
        fetchSongs();
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) return <p>Loading songs...</p>;

  return (
    <div>
      <h2>🎵 MusicVault - Home</h2>
      <Link to="/add">Add New Song</Link>
      {songs.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song._id}>
              {song.title} - {song.artist}{" "}
              <Link to={`/edit/${song._id}`}>Edit</Link>{" "}
              <button onClick={() => handleDelete(song._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
