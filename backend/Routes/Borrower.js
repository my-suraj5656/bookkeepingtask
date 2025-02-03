const express = require("express");
const Book = require("../Models/Book");
const Library = require("../Models/Library");
const ensureAuthenticated = require("../Middleware/ensureauthenticated");
const router = express.Router();
const User = require("../Models/User");

// borrow a book
router.post("/borrow", ensureAuthenticated, async (req, res) => {
  try {
    const { bookId, borrowerId, charge } = req.body;
    const book = await Book.findById(bookId);
    const borrower = await User.findById(borrowerId);

    if (!book || !borrower) {
      return res.status(404).json({ message: "Book or Borrower not found" });
    }
    if (book.borrower) {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    // Update the book's borrower and set the charge
    book.borrower = borrowerId;
    book.charge = charge;
    await book.save();

    // Respond with success
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// return a book
router.put("/return/:id", ensureAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.borrower) {
      return res.status(400).json({ message: "Book is not borrowed" });
    }

    // Remove the borrower and charge, effectively returning the book
    book.borrower = null;
    book.charge = null; // Optionally, reset the charge
    await book.save();

    // Respond with success
    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
