const express = require("express");
const Book = require("../Models/Book");
const Library = require("../Models/Library");
const ensureAuthenticated = require("../Middleware/ensureauthenticated");
const router = express.Router();
const User = require("../Models/User");

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author library borrower");
    return res.json({ books });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// get book by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author library borrower");
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    return res.json({ book });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// add book
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const { title, authorId, libraryId, image, borrower } = req.body;
    const author = await User.findById(authorId);
    const library = await Library.findById(libraryId);
    if (!author || !library)
      return res.status(404).json({ message: "Author or Library not found." });
    const newBook = new Book({
      title,
      author: authorId,
      library: libraryId,
      borrower,
      image,
    });
    await newBook.save();
    res
      .status(201)
      .json({ message: "Book added successfully.", book: newBook });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// update book deatils
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const { title, authorId, libraryId, image, borrower } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, authorId, libraryId, borrower },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ book });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

//delete a book by id
router.delete("/:id",  ensureAuthenticated, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
