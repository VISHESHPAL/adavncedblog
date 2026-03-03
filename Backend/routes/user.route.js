import express from "express";
import {
  isLoggedIn,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/user.middleware.js";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", auth, logout);
userRouter.get("/is-auth", auth ,isLoggedIn);

export default userRouter;
