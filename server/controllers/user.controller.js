import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerNewUser(req, res){
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) return res.status(400).json({
            message: "Provide recommended details",
            error: true,
            success: false
        })

        const user = await UserModel.findOne({email});

        if(user){
            return res.json({
                message: "Email already existed",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code${save?._id}`

        const verifyEmail = sendEmail({
            sendTo: email,
            subject: "Verify email from Blinkit",
            html: verifyEmailTemplate({
                name,
                url:VerifyEmailUrl
            })
        })
        console.log(verifyEmail);
        return res.json({
            message: "User registered successfully!",
            error: false,
            success: true,
            data: save
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message || err,
            error: true,
            success: false
        })
    }
}