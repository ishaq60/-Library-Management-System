import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const bookRoutes = express.Router();
bookRoutes.post("/create-book", async (req: Request, res: Response) => {
try{
  const body = req.body;
  console.log(body);
  const book = await Book.create(body);
  await book.save();
  res.status(201).json({
    success: true,
    message: "Book create Successfully",
    data: book,
  });
}
catch(error){
 res.status(400).json({ success: false, message: "Validation failed", error });
}
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
      message: "error retrieveding book",
      error: err instanceof Error ? err.message : err,
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
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error instanceof Error ? error.message : error,
    });
  }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateBody = req.body;

    // Auto-set available field based on copies
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
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating book",
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