// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value",
      success: false,
      error: err,
    });
  }

  return res.status(500).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: err,
  });
};
