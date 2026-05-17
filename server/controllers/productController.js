import Product from "../models/Product.js";

// Delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
};

export const createProduct = async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // Update fields from request body
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.image = req.body.image;
  product.brand = req.body.brand;
  product.category = req.body.category;
  product.countInStock = req.body.countInStock;

  // Save changes
  const updatedProduct = await product.save();

  // Return updated product
  res.json(updatedProduct);
};