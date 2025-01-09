import {Router} from "express"
import {registerNewUser} from "../controllers/user.controller.js"

const userRouter = Router();


userRouter.post("/register", registerNewUser);

export default userRouter;