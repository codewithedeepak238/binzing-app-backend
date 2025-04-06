import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createProduct, createCategory, createSubCategory, productList, searchProduct, singleProductDetails, deleteProduct, updateProduct} from "../controllers/product.controller.js";
import multer from "multer";
import storage from "../utils/cloudinaryStorage.js";

const productRouter = Router()

const upload = multer({ storage });


//ADMIN PROTECTED ROUTE
productRouter.post('/create-product', auth, isAdmin, upload.array("images", 5), createProduct);
productRouter.post('/create-category', auth, isAdmin, createCategory);
productRouter.post('/create-sub-category', auth, isAdmin, createSubCategory);
productRouter.patch('/:id', auth, isAdmin, updateProduct);
productRouter.delete('/:id', auth, isAdmin, deleteProduct);

//PUBLIC ROUTE
productRouter.get('/list', productList);
productRouter.get('/list/:id', singleProductDetails);
productRouter.get('/list/search', searchProduct);

export default productRouter;