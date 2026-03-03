import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

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

export const createUser = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
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