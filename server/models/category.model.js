import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
},{
    timestamps:true
})

const ProductCategoryModel = mongoose.model("productCategory", productCategorySchema);
export default ProductCategoryModel