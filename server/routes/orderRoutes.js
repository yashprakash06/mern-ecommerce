import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { getOrders, deliverOrder } from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    // Basic validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    // Transform cart items into the structure expected by Order schema
    const formattedOrderItems = orderItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }));

    // Create order document
    const order = await Order.create({
      user: req.user._id,
      orderItems: formattedOrderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all orders (admin only)
router.get("/", protect, admin, getOrders);

// Get logged-in user's orders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/deliver", protect, admin, deliverOrder);

// Get order by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Admin can view any order
    // Regular users can view only their own orders
    if (
      !req.user.isAdmin &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to view this order",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;