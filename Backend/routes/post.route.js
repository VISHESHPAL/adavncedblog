import express from "express";
import { auth } from "../middlewares/user.middleware.js";
import {
  createPost,
  deletePost,
  getAllPublicPosts,
  getSinglePost,
  togglePublish,
  updatePost,
} from "../controllers/post.controller.js";
import { authorize } from "../middlewares/role.middleware.js";

const postRouter = express.Router();

postRouter.post("/", auth, authorize("admin","author"), createPost);
postRouter.put("/:id", auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.put("/publish/:id", auth, togglePublish);
postRouter.get("/", getAllPublicPosts);
postRouter.get("/:id", getSinglePost);

export default postRouter;
         