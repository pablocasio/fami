import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10); // #jdfsjkfskdf
    const newUser = new User({
      username,
      email,

      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false, // Cambiado a false para permitir acceso desde el frontend
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const UserFound = await User.findOne({ email });
    if (!UserFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, UserFound.password); // #jdfsjkfskdf

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = await createAccesToken({ id: UserFound._id });
    res.cookie("token", token);
    res.json({
      id: UserFound._id,
      username: UserFound.username,
      email: UserFound.email,
      createAt: UserFound.createdAt,
      updateAt: UserFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
export const profile = async (req, res) => {
  const UserFound = await User.findById(req.user.id);
  if (!UserFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: UserFound._id,
    username: UserFound.username,
    email: UserFound.email,
    createAt: UserFound.createdAt,
    updateAt: UserFound.updatedAt,
  });
};
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "unatuhorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  });
};
