import { IBook } from "Interface/book.interface";
import { model, Schema } from "mongoose";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  genre: {
    type: String,
    required: true,
  genre: {
  type: String,
  enum: [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Programming / Software Development", // ✅ Added
  ],
  required: true,
}


  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"],
    unique: true,
    trim: true,
  },
  description: { type: String, default: "", trim: true },
 copies: {
  type: Number,
  required: [true, "Copies count is required"],
  min: [0, "Copies cannot be negative"],
  validate: {
    validator: Number.isInteger,
    message: "Copies must be an integer value",
  },
},

  available: { type: Boolean, default:true },


},
{
    timestamps:true
});

bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

bookSchema.methods.decreaseCopies = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  this.copies -= quantity;

  if (this.copies === 0) {
    this.available = false;
  }

  await this.save();
};



export const Book=model("Book",bookSchema)