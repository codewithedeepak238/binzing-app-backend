import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { addToCart, getCartItems } from "../controllers/order.controller.js";

const orderRouter = Router();

//USER PROTECTED ROUTE
orderRouter.post('/add-to-cart', auth, addToCart);
orderRouter.get('/cartItems', auth, getCartItems);