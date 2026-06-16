import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Search products
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q ? req.query.q.trim() : "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (keyword) {
      // Find matching categories by name
      const matchingCategories = await Category.find({
        name: { $regex: keyword, $options: "i" },
      });
      const categoryIds = matchingCategories.map((cat) => cat._id);

      // Build regex match for product
      query = {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { brand: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $in: categoryIds } },
        ],
      };
    }

    const products = await Product.find(query)
      .populate("category", "name slug")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
  // Need to get a default category or let user specify
  const defaultCategory = await Category.findOne();

  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: defaultCategory ? defaultCategory._id : null,
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

  // Handle category name -> ObjectId resolution
  let categoryId = req.body.category;
  
  if (categoryId && typeof categoryId === 'string' && !categoryId.match(/^[0-9a-fA-F]{24}$/)) {
     const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${categoryId}$`, 'i') } });
     if (existingCategory) {
       categoryId = existingCategory._id;
     } else {
       return res.status(400).json({ message: `Category "${categoryId}" not found` });
     }
  } else if (categoryId && categoryId._id) {
     categoryId = categoryId._id;
  }

  // Update fields from request body
  product.name = req.body.name;
  product.price = req.body.price;
  product.discountPrice = req.body.discountPrice;
  product.description = req.body.description;
  product.image = req.body.image;
  product.brand = req.body.brand;
  product.category = categoryId;
  product.countInStock = req.body.countInStock;
  product.featured = req.body.featured;

  // Save changes
  const updatedProduct = await product.save();

  // Return updated product
  res.json(updatedProduct);
};