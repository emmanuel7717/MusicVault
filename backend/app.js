const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./shared/middlewares/connect-db");
const songsRouter = require("./modules/songs/routes/song");
const usersRouter = require("./modules/users/users-route");
const authorize = require("./shared/middlewares/authorize");

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow React dev server
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// quick health check
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// auth routes
app.use("/api/users", usersRouter);

// songs routes – only for logged-in users (admin or user)
app.use("/api/songs", authorize(["admin", "user"]), songsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`MusicVault backend running at http://localhost:${PORT}`);
});
