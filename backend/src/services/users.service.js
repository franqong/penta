import prisma from "../config/prisma.js";

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      followers: true,
      following: true,
      reviews: true,
      posts: true,
    },
  });
};

export const followUser = async (followerId, followingId) => {
  return await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
};

export const unfollowUser = async (followerId, followingId) => {
  return await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};
