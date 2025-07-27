import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10); // #jdfsjkfskdf
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);
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
