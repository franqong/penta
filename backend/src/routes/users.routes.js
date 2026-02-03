import { Router } from "express";
import {
  getUsers,
  getUser,
  followUser,
  unfollowUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/:id/follow", followUser);
router.delete("/users/:id/unfollow", unfollowUser);

export default router;
