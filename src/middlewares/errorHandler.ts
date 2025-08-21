import { Request, Response, NextFunction } from "express";

// Generic Error Handler Middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: "Validation failed",
    error: err
  });
};
