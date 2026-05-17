import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { deleteProduct, createProduct, updateProduct} from "../controllers/productController.js";

const router = express.Router();

// GET all products
// POST create new product (admin only)
// combine them using express chaining
router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
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
      const product = await Product.findById(req.params.id);

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
  .put(protect,admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;