import { Schema, model } from 'mongoose';
import { IBorrow } from '../Interface/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      required: [true, "Book ID is required"],
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be a positive number"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
