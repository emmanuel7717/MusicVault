import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🎵 MusicVault</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/add">Add Song</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddSong />} />
            <Route path="/edit/:id" element={<EditSong />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
