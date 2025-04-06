import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

export async function isAdmin(req, res, next) {
    try {
        let accessToken = req.cookies?.accessToken || req?.header?.authorization?.split(" ")[1];
        if (!accessToken) {
            return res.status(400).json({
                message: "You are not authorised login first.",
                error: true,
                success: false
            })
        }

        const decode = jwt.verify(accessToken, process.env.SECRET_KEY);
        console.log(decode);
        const user = await UserModel.findOne({ _id: decode.id });

        console.log(user);

        if (user.role === "ADMIN") {
            next()
        }else{
            return res.status(400).json({
                message: "This is admin protect routes",
                error: true,
                success: false
            })
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