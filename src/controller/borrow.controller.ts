import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();


borrowRoutes.post("/", async (req, res) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });

    await book.decreaseCopies(quantity); // ✅ use instance method here

    const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({ message: "Validation failed", success: false, error });
  }
});



//get borrow all


borrowRoutes.get("/",async(req:Request,res:Response)=>{
  
  try{
const summary = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      { $lookup: { from: "books", localField: "_id", foreignField: "_id", as: "book" } },
      { $unwind: "$book" },
      { $project: { _id: 0, book: { title: "$book.title", isbn: "$book.isbn" }, totalQuantity: 1 } }
    ]);
    res.json({ success: true, message: "Borrowed books summary retrieved successfully", data: summary });
  }
catch(error){ res.status(500).json({ success: false, message: "Error retrieving summary", error: error });
}

  
})