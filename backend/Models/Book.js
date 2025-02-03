const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  charge: { type: Number, default: null },
  status: {
    type: String,
    enum: ["Available", "Borrowed"],
    default: "Available",
  },
});

const Book = mongoose.model("Book", bookschema);
module.exports = Book;
