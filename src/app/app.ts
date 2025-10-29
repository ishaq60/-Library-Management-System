
import express,{Application,Request,Response} from "express"

import { bookRoutes } from "../controller/books.controller"
import { borrowRoutes } from '../controller/borrow.controller';
import { errorHandler } from "../middlewares/errorHandler";
const app:Application=express()
import cors from "cors";
app.use(express.json())
app.use(cors());

app.use("/api/books",bookRoutes)

app.use("/api/borrow", borrowRoutes);


app.use(errorHandler);
app.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to Book app")
})

export default app