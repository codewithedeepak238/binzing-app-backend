import CartProductModel from "../models/cartProduct.model.js";

export async function addToCart(req, res) {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required." });
        }

        // Check if product already exists in cart
        const existingItem = await CartProductModel.findOne({ userId, productId });

        if (existingItem) {
            // If exists, update quantity
            existingItem.quantity += quantity || 1;
            await existingItem.save();

            return res.status(200).json({
                message: "Cart updated (quantity increased)",
                cartItem: existingItem
            });
        }

        // If not exists, create a new cart item
        const newCartItem = new CartProductModel({
            userId,
            productId,
            quantity: quantity || 1
        });

        await newCartItem.save();

        res.status(201).json({
            message: "Product added to cart",
            cartItem: newCartItem
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

export async function removeCartItem(req, res) {
    try {
        const userId = req.userId;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required." });
        }
        const isExist = await CartProductModel.findOne({ _id: productId, userId });
        if (!isExist) {
            return res.status(400).json({ message: "This product is not in cart." });
        }

        await CartProductModel.deleteOne({ _id: productId, userId });

        return res.status(200).json({
            message: "Product removed from cart"
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export async function incrementCartItem(req, res) {
    try {
        const userId = req.userId;
        const {id} = req.params;

        const product = await CartProductModel.findOne({_id:id, userId});
        if(!product){
            return res.status(400).json({ message: "Product not found in cart." });
        }

        product.quantity +=1;

        await product.save();

        return res.status(200).json({
            message: "Product quantity increased."
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


export async function decrementCartItem(req, res) {
    try {
        const userId = req.userId;
        const {id} = req.params;

        const product = await CartProductModel.findOne({_id:id, userId});
        if(!product){
            return res.status(400).json({ message: "Product not found in cart." });
        }
        if(product.quantity >1){
            product.quantity -=1;
            await product.save();
            return res.status(200).json({
                message: "Product quantity decreased."
            })
        }
        
        if(product.quantity===1){
            await CartProductModel.deleteOne({ _id: id, userId });
            return res.status(200).json({
                message: "Product removed from cart."
            })
        }
        
        return res.status(400).json({
            message: "Invalid product quantity",
            error: true,
            success: false
        })

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export async function getCartItems(req, res) {
    try {
        const userId = req.userId;

        const cartItems = await CartProductModel.find({ userId }).populate("productId");

        res.status(200).json({
            message: "Cart fetched successfully",
            cart: cartItems
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}