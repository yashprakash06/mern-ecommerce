import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { deleteProduct, createProduct, updateProduct, searchProducts } from "../controllers/productController.js";

const router = express.Router();

// GET search products (must be above /:id)
router.get("/search", searchProducts);

// GET all products
// POST create new product (admin only)
router
  .route("/")
  .get(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const products = await Product.find()
        .populate("category", "name slug")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments();

      res.json({
        products,
        page,
        pages: Math.ceil(total / limit),
        total
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .post(protect, admin, createProduct);

// GET single product by ID
// DELETE product by ID (admin only)
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate("category", "name slug");

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;