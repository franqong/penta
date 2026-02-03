import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const updateCommunitySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});
