import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Upload single image file
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  (req, res) => {
    res.json({
      image: `/uploads/${req.file.filename}`,
    });
  }
);

export default router;