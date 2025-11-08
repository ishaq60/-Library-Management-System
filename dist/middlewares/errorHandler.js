"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
