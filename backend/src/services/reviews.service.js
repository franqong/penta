import prisma from "../config/prisma.js";

export const getReviews = async () => {
  return await prisma.review.findMany();
};

export const getReview = async (id) => {
  return await prisma.review.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

export const createReview = async (data) => {
  return await prisma.review.create({
    data,
  });
};

export const updateReview = async (id, data) => {
  return await prisma.review.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

export const deleteReview = async (id) => {
  return await prisma.review.delete({
    where: {
      id: parseInt(id),
    },
  });
};
