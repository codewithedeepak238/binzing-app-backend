import {Router} from "express"
import {registerNewUser, verfiyForgotOtp, generateNewPassword, verifyEmail, loginHandler, forgotPasswordController, logoutController, resetPassword, createProduct} from "../controllers/user.controller.js"
import { auth } from "../middlewares/auth.js";

const userRouter = Router();


userRouter.post("/register", registerNewUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", loginHandler);
userRouter.get("/logout", auth, logoutController);
userRouter.patch("/reset-password", auth, resetPassword);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verfiyForgotOtp);
userRouter.put("/reset-forgot-password", generateNewPassword);

export default userRouter;