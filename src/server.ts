import { Server } from "http";
import app from "./app/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (dev)
app.use(cors());

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

main();
