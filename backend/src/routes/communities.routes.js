import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  getCommunity,
  getCommunities,
  updateCommunity,
} from "../controllers/communities.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  createCommunitySchema,
  updateCommunitySchema,
} from "../schemas/communities.schema.js";

const router = Router();

router.get("/", getCommunities);
router.get("/:id", getCommunity);
router.post(
  "/",
  validateSchema(createCommunitySchema),
  createCommunity
);
router.put(
  "/:id",
  validateSchema(updateCommunitySchema),
  updateCommunity
);
router.delete("/:id", deleteCommunity);

export default router;
