import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/reviews.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createReviewSchema, updateReviewSchema } from "../schemas/reviews.schema.js";

const router = Router();

router.get("/reviews", getReviews);
router.get("/reviews/:id", getReview);
router.post("/reviews", validateSchema(createReviewSchema), createReview);
router.put("/reviews/:id", validateSchema(updateReviewSchema), updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;
