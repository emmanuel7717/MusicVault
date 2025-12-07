const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const { songValidationRules, validate } = require("../middlewares/validation");

// CREATE
router.post("/", songValidationRules, validate, async (req, res) => {
  try {
    const doc = await Song.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const docs = await Song.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ by id
router.get("/:id", async (req, res) => {
  try {
    const doc = await Song.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Song not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", songValidationRules, validate, async (req, res) => {
  try {
    const doc = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ error: "Song not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Song.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Song not found" });
    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
