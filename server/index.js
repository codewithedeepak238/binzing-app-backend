import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./config/connection.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import detailRouter from "./routes/userDetail.route.js";
import orderRouter from "./routes/order.route.js"
dotenv.config();

const app = express();

//middlewares
app.use(cors({origin: process.env.FRONTEND_URL, allowedHeaders: ["Content-Type", "Authorization"], credentials:true}));
app.options('*', cors())
app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


//Routes
app.get("/", (req, res)=>{
    res.send("Welcome to homepage!!")
})

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/detail', detailRouter);
app.use('/api/order', orderRouter);

const PORT = 8000;

connectToMongoDB().then(()=>{
    app.listen(PORT, ()=>console.log("Server started on port "+PORT));
})
