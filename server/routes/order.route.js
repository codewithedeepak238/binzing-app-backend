import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { addToCart, getCartItems, removeCartItem, incrementCartItem, decrementCartItem } from "../controllers/order.controller.js";

const orderRouter = Router();

//USER PROTECTED ROUTE
orderRouter.post('/add-to-cart', auth, addToCart);
orderRouter.get('/cartItems', auth, getCartItems);
orderRouter.delete('/remove-item', auth, removeCartItem);
orderRouter.patch('/increment/:id', auth, incrementCartItem);
orderRouter.patch('/decrement/:id', auth, decrementCartItem);


export default orderRouter;