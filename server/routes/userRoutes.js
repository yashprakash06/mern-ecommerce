import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import admin from "../middleware/adminMiddleware.js";
import { getUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome user", user: req.user });
});

router.put("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    message: "Profile updated",
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });
});

router.get("/admin-test", protect, admin, (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

router.get("/", protect, admin, getUsers);

router.delete("/:id", protect, admin, deleteUser);

router.get("/:id", protect, admin, getUserById);

router.put("/:id", protect, admin, updateUser);

export default router;