import prisma from "../config/prisma.js";

export const getPosts = async () => {
  return await prisma.post.findMany();
};

export const getPost = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

export const createPost = async (data) => {
  return await prisma.post.create({
    data,
  });
};

export const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
};
