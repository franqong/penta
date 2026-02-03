import * as albumService from "../services/albums.service.js";

export const getAlbums = async (req, res, next) => {
  try {
    const albums = await albumService.getAlbums();
    res.json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbum = async (req, res, next) => {
  try {
    const album = await albumService.getAlbum(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(album);
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const newAlbum = await albumService.createAlbum(req.body);
    res.status(201).json(newAlbum);
  } catch (error) {
    next(error);
  }
};

export const updateAlbum = async (req, res, next) => {
  try {
    const updatedAlbum = await albumService.updateAlbum(req.params.id, req.body);
    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(updatedAlbum);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const deletedAlbum = await albumService.deleteAlbum(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
