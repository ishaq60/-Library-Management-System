"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Generic Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    res.status(400).json({
        success: false,
        message: "Validation failed",
        error: err
    });
};
exports.errorHandler = errorHandler;
