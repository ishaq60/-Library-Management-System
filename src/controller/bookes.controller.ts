import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const bookRoutes = express.Router();
bookRoutes.post("/create-book", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const book = await Book.create(body);
  await book.save();
  res.status(201).json({
    success: true,
    message: "Book create Successfully",
    data: book,
  });
});

//all book find
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const books = await Book.find(filter ? { genre: filter } : {})
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit) || 10);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data:books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: err instanceof Error ? err.message : err,
    });
  }
});

//
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfull",
      book: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error instanceof Error ? error.message : error,
    });
  }
});
bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
const updatebody=req.body
    const book = await Book.findByIdAndUpdate(bookId,updatebody,{new:true})
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error instanceof Error ? error.message : error,
    });
  }
});


bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId,{new:true});
    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error instanceof Error ? error.message : error,
    });
  }
});