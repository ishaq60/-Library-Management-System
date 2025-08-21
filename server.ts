import { Server } from "http";
import app from "./src/app/app";
const mongoose = require('mongoose');

let server:Server
const PORT=3000
async function main() {
  try{
    await mongoose.connect('mongodb+srv://LibraryManagement:n1Akhhx2k5y5GmRT@cluster0.uqruf4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
    server=app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`)
    })

  }
catch(error) {

}
}
main()