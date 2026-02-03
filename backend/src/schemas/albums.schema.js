import { z } from "zod";

export const createAlbumSchema = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  year: z.number().int().min(1900),
  coverImage: z.string().url(),
});

export const updateAlbumSchema = z.object({
  title: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  year: z.number().int().min(1900).optional(),
  coverImage: z.string().url().optional(),
});
