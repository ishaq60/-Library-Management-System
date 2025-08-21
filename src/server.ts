// server.ts
import { Server } from "http";
import app from "./app/app";
import mongoose from "mongoose"; // better to use ES module import
import dotenv from "dotenv";

dotenv.config();

let server: Server;
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

main();
