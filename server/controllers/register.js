import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    profilePicture,
    occupation,
    location,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profilePicture,
      occupation,
      location,
      impressions: Math.floor(Math.random() * 100000 + 1),
      views: Math.floor(Math.random() * 10000 + 1),
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
