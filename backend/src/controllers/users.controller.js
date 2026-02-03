import * as userService from "../services/users.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const followUser = async (req, res, next) => {
  try {
    // Assuming the authenticated user's ID is available in req.user.id
    const followerId = req.user.id;
    const followingId = parseInt(req.params.id);
    await userService.followUser(followerId, followingId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    // Assuming the authenticated user's ID is available in req.user.id
    const followerId = req.user.id;
    const followingId = parseInt(req.params.id);
    await userService.unfollowUser(followerId, followingId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
