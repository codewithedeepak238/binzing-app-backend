import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateOtp from "../utils/generateOTP.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

export async function registerNewUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({
            message: "Provide recommended details",
            error: true,
            success: false
        })

        const user = await UserModel.findOne({ email });

        if (user) {
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
            subject: "Verify email from BinZing",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
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
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


export async function verifyEmail(req, res) {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({ _id: code });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return res.json({
            message: "Email verification done",
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


export async function loginHandler(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email & Password are required",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Account is not active or suspended!",
                error: true,
                success: false
            })
        }

        const checkPassowrd = await bcryptjs.compare(password, user.password);

        if (!checkPassowrd) {
            return res.status(400).json({
                message: "Password is invalid!",
                error: true,
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateAccessToken(user._id);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        const update = await UserModel.findByIdAndUpdate(user._id, {
            access_token: accessToken,
            refresh_token: refreshToken
        })

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        return res.status(200).json({
            message: "User successfully logged in",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
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

export async function logoutController(req, res) {
    try {

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie("accessToken", cookieOption)
        res.clearCookie("refreshToken", cookieOption)
        return res.json({
            message: "Logout successfully",
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

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        const OTP = generateOtp();
        const expireTime = Date.now() + 3600000;

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: OTP,
            forgot_password_expiry: expireTime
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot password from BinZing",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: OTP
            })
        })

        return res.json({
            message: "Check your email",
            error: false,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export async function verfiyForgotOtp(req, res) {
    try {
        const { email, OTP } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                error: true,
                success: false
            })
        }

        if (OTP !== user.forgot_password_otp) {
            return res.status(400).json({
                message: "OTP Is Invalid",
                error: true,
                success: false
            })
        }

        const currentTime = Date.now();

        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "OTP Is Expired",
                error: true,
                success: false
            })
        }

        //If otp is valid and not expired
        return res.json({
            message: "OTP Verified Successfully",
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

export async function generateNewPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide requried fields",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirm password didn't match.",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);


        await UserModel.findOneAndUpdate(user._id, {
            password: hashPassword
        })

        return res.json({
            message: "Password updated successfully",
            error: false,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide requried fields",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirm password didn't match.",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);


        await UserModel.findOneAndUpdate(user._id, {
            password: hashPassword
        })

        return res.json({
            message: "Password updated successfully",
            error: false,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
export async function createProduct(req, res) {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body;

        if (!name, !category, !unit, !stock, !price, !description, !more_details) {
            return res.status(400).json({
                message: "Provide recommended details",
                error: true,
                success: false
            })
        }

        const payload = {
            name, image: [], category, subCategory, unit, stock, price, discount, description, more_details
        }

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