import { Router } from "express";
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "../controllers/albums.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAlbumSchema, updateAlbumSchema } from "../schemas/albums.schema.js";

const router = Router();

router.get("/albums", getAlbums);
router.get("/albums/:id", getAlbum);
router.post("/albums", validateSchema(createAlbumSchema), createAlbum);
router.put("/albums/:id", validateSchema(updateAlbumSchema), updateAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
