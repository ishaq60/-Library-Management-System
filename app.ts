
import express,{Application,Request,Response} from "express"

import { bookRoutes } from "./src/controller/bookes.controller"
import { borrowRoutes } from './src/controller/borrow.controller';
import { errorHandler } from "./src/middlewares/errorHandler";
const app:Application=express()

app.use(express.json())

app.use("/api/books",bookRoutes)

app.use("/api/borrow", borrowRoutes);


app.use(errorHandler);
app.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to Book app")
})

export default app