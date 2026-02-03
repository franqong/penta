import prisma from "../config/prisma.js";

export const getAlbums = async () => {
  return await prisma.album.findMany();
};

export const getAlbum = async (id) => {
  return await prisma.album.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

export const createAlbum = async (data) => {
  return await prisma.album.create({
    data,
  });
};

export const updateAlbum = async (id, data) => {
  return await prisma.album.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

export const deleteAlbum = async (id) => {
  return await prisma.album.delete({
    where: {
      id: parseInt(id),
    },
  });
};
