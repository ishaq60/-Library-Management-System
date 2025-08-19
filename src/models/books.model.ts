import { IBook } from "Interface/book.interface";
import { model, Schema } from "mongoose";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  genre: {
    type: String,
    required: true,
    enum: [
      "FICTION",
      "NON-FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"],
    unique: true,
    trim: true,
  },
  description: { type: String, default: "", trim: true },
  copies: { type: Number, required: [true,"Copies count is required"] },
  available: { type: Boolean, default:true },
 
},
{
    timestamps:true
});
export const Book=model("Book",bookSchema)