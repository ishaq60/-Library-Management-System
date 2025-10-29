import { IBook,IBookMethods,Genre } from "../Interface/book.interface";
import { model, Schema, Model } from "mongoose";


interface BookModel extends Model<IBook, {}, IBookMethods> {
  decreaseCopies(id:string,quantity: number): Promise<void>;
}


const bookSchema = new Schema<IBook, BookModel, IBookMethods>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: {
      type: String,
      required: [true, "isbn is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "copies is required"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

bookSchema.pre('save', function(next) {
  if (this.isModified('copies') && this.copies === 0) {
    this.available = false;
  }
  next();
});

bookSchema.static('decreaseCopies',async function decreaseCopies(id:string,quantity: number) {
  const book = await this.findById(id);
  if (!book) {
    throw new Error('Book not found');
  }
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();
});

export const Book = model<IBook, BookModel>("Book", bookSchema);