import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./config/connection.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();

//middlewares
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


//Routes
app.get("/", (req, res)=>{
    res.send("Welcome to homepage!!")
})

app.use('/api/user', userRouter);

const PORT = 8000;

connectToMongoDB().then(()=>{
    app.listen(PORT, ()=>console.log("Server started on port "+PORT));
})
