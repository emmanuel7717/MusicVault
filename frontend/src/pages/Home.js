import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSongs, deleteSong } from "../api/songApi";

function Home() {
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSongs = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await getSongs();
      setSongs(res.data);
    } catch (err) {
      console.log(err);
      setMessage("Could not load songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this song?")) return;

    try {
      await deleteSong(id);
      setSongs((prev) => prev.filter((s) => s._id !== id));
      setMessage("Song deleted.");
    } catch (err) {
      console.log(err);
      setMessage("Failed to delete song.");
    }
  };

  return (
    <div>
      <h2>All Songs</h2>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
      {!loading && songs.length === 0 && <p>No songs found.</p>}

      {!loading && songs.length > 0 && (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>
                  <Link to={`/edit/${song._id}`}>Edit</Link>{" "}
                  <button onClick={() => handleDelete(song._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/add">+ Add Song</Link>
    </div>
  );
}

export default Home;
