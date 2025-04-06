import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "products", // cloud folder
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
});

export default storage;
