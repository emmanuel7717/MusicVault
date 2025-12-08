import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";   
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("pendingEmail");
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MusicVault</h1>
          <nav>
            <Link to="/">All Songs</Link>{" "}
            <Link to="/add">Add Song</Link>{" "}
            {!user && (
              <>
                <Link to="/login">Login</Link>{" "}
                <Link to="/register">Register</Link> {/* 👈 NEW */}
              </>
            )}
            {user && (
              <>
                <span style={{ marginLeft: "1rem" }}>Hi, {user.name}</span>
                <button style={{ marginLeft: "1rem" }} onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddSong />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditSong />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* 👈 NEW */}
            <Route
              path="/verify-otp"
              element={<VerifyOtp onLogin={setUser} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
