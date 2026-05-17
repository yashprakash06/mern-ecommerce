import Order from "../models/Order.js";

// Get all orders (admin only)
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate(
    "user",
    "name email"
  );

  res.json(orders);
};

export const deliverOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  // Mark as delivered
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  // Save changes
  const updatedOrder = await order.save();

  // Return updated order
  res.json(updatedOrder);
};