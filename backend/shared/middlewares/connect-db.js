const mongoose = require("mongoose");

function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("Missing MONGODB_URI in .env");
    return;
  }

  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err.message));
}

module.exports = connectDB;
