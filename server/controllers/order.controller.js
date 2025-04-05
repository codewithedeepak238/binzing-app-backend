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