import express from "express";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

const router = express.Router();

// Create Razorpay Order
router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);

    res.status(500).json({
      message: "Failed to create Razorpay order",
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Generate expected signature
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    // Verify signature
    let isAuthentic =
      expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    // Find order in MongoDB
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Mark order as paid
    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: razorpay_payment_id,
      status: "completed",
      update_time: new Date().toISOString(),
      email_address: order.user?.email || "",
    };

    await order.save();
    
    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    res.status(500).json({
      message: "Payment verification failed",
    });
  }
});

export default router;