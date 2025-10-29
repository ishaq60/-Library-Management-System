import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const bookRoutes = express.Router();
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
  }
});

//all book find
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter; 
    }

    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sortBy as string] = sort === "desc" ? -1 : 1;

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving books",
      error: error,
    });
  }
});

//
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error,
    });
  }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateBody = req.body;

    if (updateBody.copies !== undefined) {
      updateBody.available = updateBody.copies > 0;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      updateBody,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: "Error updating book",
      error: error,
    });
  }
});


bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error,
    });
  }
});
