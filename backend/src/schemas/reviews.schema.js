import { z } from "zod";

export const createReviewSchema = z.object({
  title: z.string().min(1),
  comment: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  userId: z.number().int(),
  albumId: z.number().int(),
});

export const updateReviewSchema = z.object({
  title: z.string().min(1).optional(),
  comment: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
});
