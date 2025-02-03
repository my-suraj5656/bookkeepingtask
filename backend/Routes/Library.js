const express = require("express");
const Book = require("../Models/Book");
const Library = require("../Models/Library");
const ensureAuthenticated = require("../Middleware/ensureauthenticated");
const router = express.Router();
const User = require("../Models/User");

// get all library
router.get("/", async (req, res) => {
  try {
    const libraries = await Library.find().populate("books");
    res.json({ libraries });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// get a specific libarary by id
router.get("/:id", async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate("books");
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.json({ library });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// create a new library
router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newlibrary = await Library({ name, location });
    await newlibrary.save();
    res.status(201).json({ library: newlibrary });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// update library details
router.put("/:id", async (req, res) => {
  try {
    const { name, location } = req.body;
    const library = await Library.findByIdAndUpdate(req.params.id, {
      name,
      location,
    });
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    res.json({ message: "Updated library detail successfully", library });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// delete a library
router.delete("/:id", async (req, res) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.status(200).json({ message: "Library deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// get a list of book in library
router.get("/:id/inventory", async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate("books");
    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }
    res.json({ books: library.books });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// add book to library inventory
router.post("/:id/inventory", async (req, res) => {
  try {
    const { bookId } = req.body;
    const library = await Library.findById(req.params.id);
    library.books.push(bookId);
    await library.save();
    res.status(201).json({ library });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// remove a book from library inventory
router.delete("/:id/inventory/:bookId", async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    library.books.pull(req.params.bookId);
    await library.save();
    res.status(201).json({ message: "Book remove successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
