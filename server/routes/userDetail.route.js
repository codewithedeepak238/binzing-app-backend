import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createAddress, getAllAddress } from "../controllers/userDetails.controller.js";

const detailRouter = Router();

detailRouter.post("/add-address", auth, createAddress);
detailRouter.get("/address", auth, getAllAddress);

export default detailRouter;