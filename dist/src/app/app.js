"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookes_controller_1 = require("../controller/bookes.controller");
const borrow_controller_1 = require("../controller/borrow.controller");
const errorHandler_1 = require("../middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", bookes_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Welcome to Book app");
});
exports.default = app;
