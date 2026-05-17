import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");

  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Cannot delete admin users
  if (user.isAdmin) {
    return res.status(400).json({
      message: "Cannot delete admin user",
    });
  }

  await user.deleteOne();

  res.json({
    message: "User deleted successfully",
  });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Update fields with values sent from the frontend
  user.name = req.body.name;
  user.email = req.body.email;
  user.isAdmin = req.body.isAdmin;

  // Save updated document to MongoDB
  const updatedUser = await user.save();

  // Return updated user (excluding password)
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
};