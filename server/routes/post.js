import express from "express";
import {
  getAllPosts,
  getUserPosts,
  likePost,
  commentPost,
  getPost,
} from "../controllers/post.js";
const routes = express.Router();
routes.get("/", getAllPosts);
routes.get("/:id", getPost);
routes.get("/user/:id", getUserPosts);
routes.patch("/:id/:userId/like", likePost);
routes.patch("/:id/:userId/comment", commentPost);
export default routes;
