import express from "express";
import { auth } from "../middlewares/user.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getAllUsers, updateUserRole } from "../controllers/role.controller.js";

const roleRouter = express.Router();

roleRouter.get("/", auth, authorize("admin"), getAllUsers);
roleRouter.put("/role/:id", auth, authorize("admin"), updateUserRole);

export default roleRouter;
