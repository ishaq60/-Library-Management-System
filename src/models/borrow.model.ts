import { Schema, model } from 'mongoose';
import { IBorrow } from '../Interface/borrow.interface';

const BorrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Borrow = model<IBorrow>('borrow', BorrowSchema);
