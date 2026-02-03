import { Router } from "express";
import {
  getUsers,
  getUser,
  followUser,
  unfollowUser,
} from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/validateToken.js"; // Import authRequired

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/:id/follow", authRequired, followUser); // Added authRequired
router.delete("/:id/unfollow", authRequired, unfollowUser); // Added authRequired

export default router;