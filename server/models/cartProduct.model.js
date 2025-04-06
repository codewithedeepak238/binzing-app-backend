import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "category"
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const CartProductModel = mongoose.model("cartProduct", cartProductSchema);
export default CartProductModel