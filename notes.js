const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: GET all notes - Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note - Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Extract data from request
      const { title, description, tag } = req.body;

      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create new note
      const notes = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save note to database
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error adding note:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE 3:Update an existing note POST "/api/auth/updatente".Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error("Error adding note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4:Delete  an existing note Delete "/api/auth/deletenote".Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note by id
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
