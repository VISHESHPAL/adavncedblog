import express from "express";
import { auth } from "../middlewares/user.middleware.js";
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comment.controller.js";

const commentRoute = express.Router();

commentRoute.post("/:postId", auth, addComment);
commentRoute.get("/:postId", getPostComments);
commentRoute.put("/edit/:id", auth, updateComment);
commentRoute.delete("/delete/:id", auth, deleteComment);

export default commentRoute;
