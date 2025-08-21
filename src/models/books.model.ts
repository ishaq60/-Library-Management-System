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
  copies: { type: Number, required: [true,"Copies count is required"],min:[0,"copies cannot be negative"] },
  available: { type: Boolean, default:true },


},
{
    timestamps:true
});

bookSchema.pre("save",function(next){
  this.available=this.copies>0
  console.log(next)
  next()
})

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