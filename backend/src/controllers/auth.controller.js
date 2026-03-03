import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userService from "../services/users.service.js";

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    const token = await createAccessToken({ id: newUser.id });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password, ...userResponse } = newUser;
    res.status(201).json(userResponse);
  } catch (error) {
     if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userFound = await userService.findUserByEmail(email);
    if (!userFound) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: userPassword, ...userResponse } = userFound;
    res.json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};