import User from "../model/user.js";
import Post from "../model/post.js";
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from "path";

// Get user profile with posts
export const getUserProfile = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: id }).sort({ createdAt: -1 });
    res.status(200).json({ user, posts });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Update user profile
export const userupdate = async (req, res) => {
  const id = req.id;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 12);
      user.password = hashedPass;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      updatedUser: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Upload new avatar
export const uploadavatar = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "Avatar uploaded",
      avatar: req.file.filename,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete avatar
export const deleteavatar = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const oldAvatar = user.avatar;
    user.avatar = '';
    await user.save();

    if (oldAvatar) {
      const filePath = path.resolve('uploads', oldAvatar);
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error("Failed to delete avatar file:", err.message);
      }
    }

    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Update avatar and delete old one
export const updateavatar = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const oldAvatar = user.avatar;
    user.avatar = req.file.filename;
    await user.save();
  
    if (oldAvatar) {
      const filePath = path.resolve('uploads', oldAvatar);
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error("Error deleting old avatar:", err.message);
      }
    }

    res.status(200).json({
      message: "Avatar updated successfully",
      avatar: req.file.filename,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
