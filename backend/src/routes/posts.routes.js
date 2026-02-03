import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPostSchema, updatePostSchema } from "../schemas/posts.schema.js";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", validateSchema(createPostSchema), createPost);
router.put("/posts/:id", validateSchema(updatePostSchema), updatePost);
router.delete("/posts/:id", deletePost);

export default router;
