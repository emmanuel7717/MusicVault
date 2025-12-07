import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSongs, updateSong } from "../api/songApi";

const emptySong = {
  title: "",
  artist: "",
  album: "",
  genre: "",
  duration: "",
};

function EditSong() {
  const [song, setSong] = useState(emptySong);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSong = async () => {
      try {
        setLoading(true);
        const res = await getSongs();
        const found = res.data.find((s) => s._id === id);
        if (found) {
          setSong({ ...found, duration: String(found.duration) });
        } else {
          setMessage("Song not found.");
        }
      } catch (err) {
        console.log(err);
        setMessage("Could not load song.");
      } finally {
        setLoading(false);
      }
    };

    loadSong();
  }, [id]);

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!song.title) newErrors.title = "Required";
    if (!song.artist) newErrors.artist = "Required";
    if (!song.album) newErrors.album = "Required";
    if (!song.genre) newErrors.genre = "Required";
    if (!song.duration || isNaN(song.duration))
      newErrors.duration = "Duration must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;

    try {
      const payload = { ...song, duration: Number(song.duration) };
      await updateSong(id, payload);
      setMessage("Song updated.");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.log(err);
      setMessage("Failed to update song.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Song</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input name="title" value={song.title} onChange={handleChange} />
          </label>
          {errors.title && <small>{errors.title}</small>}
        </div>

        <div>
          <label>
            Artist
            <input name="artist" value={song.artist} onChange={handleChange} />
          </label>
          {errors.artist && <small>{errors.artist}</small>}
        </div>

        <div>
          <label>
            Album
            <input name="album" value={song.album} onChange={handleChange} />
          </label>
          {errors.album && <small>{errors.album}</small>}
        </div>

        <div>
          <label>
            Genre
            <input name="genre" value={song.genre} onChange={handleChange} />
          </label>
          {errors.genre && <small>{errors.genre}</small>}
        </div>

        <div>
          <label>
            Duration
            <input
              name="duration"
              value={song.duration}
              onChange={handleChange}
            />
          </label>
          {errors.duration && <small>{errors.duration}</small>}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditSong;
