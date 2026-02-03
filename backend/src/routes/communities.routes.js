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

router.get("/communities", getCommunities);
router.get("/communities/:id", getCommunity);
router.post(
  "/communities",
  validateSchema(createCommunitySchema),
  createCommunity
);
router.put(
  "/communities/:id",
  validateSchema(updateCommunitySchema),
  updateCommunity
);
router.delete("/communities/:id", deleteCommunity);

export default router;
