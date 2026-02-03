import prisma from "../config/prisma.js";

export const getCommunities = async () => {
  return await prisma.community.findMany();
};

export const getCommunity = async (id) => {
  return await prisma.community.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

export const createCommunity = async (data) => {
  return await prisma.community.create({
    data,
  });
};

export const updateCommunity = async (id, data) => {
  return await prisma.community.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

export const deleteCommunity = async (id) => {
  return await prisma.community.delete({
    where: {
      id: parseInt(id),
    },
  });
};
