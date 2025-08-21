import express from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();


borrowRoutes.post("/", async (req, res) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });

    if (book.copies < quantity)
      return res
        .status(400)
        .json({ success: false, message: "Not enough copies available" });

    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
    await book.save();

    const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

    res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
});
