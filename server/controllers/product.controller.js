import ProductModel from "../models/product.model.js";
import ProductCategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

export async function createProduct(req, res) {
    try {
        const {
            name,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        } = req.body;

        if (!name || !category || !unit || !stock || !price || !description || !more_details) {
            return res.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const parsedCategory = Array.isArray(category) ? category : [category];
        const parsedSubCategory = Array.isArray(subCategory) ? subCategory : [subCategory];

        // Map image URLs from Cloudinary uploads
        const imageUrls = req.files?.map(file => file.path) || [];


        const payload = {
            name,
            image: imageUrls,
            category: parsedCategory,
            subCategory: parsedSubCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        };

        const product = new ProductModel(payload);
        const save = await product.save();

        return res.json({
            message: "Product Created successfully!",
            error: false,
            success: true,
            data: save
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

export async function createCategory(req, res) {
    try {
        const { name, image } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Provide recommended details",
                error: true,
                success: false
            })
        }

        const payload = { name, image };
        const category = new ProductCategoryModel(payload);
        const save = await category.save();
        return res.status(200).json({
            message: "Category Created successfully!",
            error: false,
            success: true,
            data: save
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

export async function createSubCategory(req, res) {
    try {
        const { name, image, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                message: "Provide recommended details",
                error: true,
                success: false
            })
        }

        const payload = { name, image, category };
        const subCategory = new SubCategoryModel(payload);
        const save = await subCategory.save();
        return res.status(200).json({
            message: "Category Created successfully!",
            error: false,
            success: true,
            data: save
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

export async function productList(req, res) {
    try {
        const products = await ProductModel.find();
        if (!products) {
            return res.status(404).json({
                message: "No Products Available",
                error: true,
                success: false
            })
        }
        return res.status(200).json({
            message: "Success",
            error: false,
            success: true,
            data: products
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

export async function singleProductDetails(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "This Product is Not Available",
                error: true,
                success: false
            })
        }
        return res.status(200).json({
            message: "Success",
            error: false,
            success: true,
            data: product
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

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "This Product is Not Available",
                error: true,
                success: false
            })
        }
        await ProductModel.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Product Removed Successfully.",
            error: false,
            success: true
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

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "This Product is Not Available",
                error: true,
                success: false
            })
        }
        const { name, image, unit, stock, price, discount, description, more_details } = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, image, unit, stock, price, discount, description, more_details }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Error in updating product.",
                error: true,
                success: false
            })
        }
        return res.status(200).json({
            message: "Product Updated Successfully.",
            error: false,
            success: true,
            data: updatedProduct
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

export async function searchProduct(req, res) {
    try {
        const query = req.query.item;

        if (query !== null) {
            const searchList = await ProductModel.find({})
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}