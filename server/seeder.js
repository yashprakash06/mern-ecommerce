import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";

dotenv.config();

connectDB();

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Smartphones", slug: "smartphones" },
  { name: "Laptops", slug: "laptops" },
  { name: "Fashion", slug: "fashion" },
  { name: "Men's Clothing", slug: "mens-clothing" },
  { name: "Women's Clothing", slug: "womens-clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Furniture", slug: "furniture" },
  { name: "Beauty", slug: "beauty" },
  { name: "Books", slug: "books" },
  { name: "Sports & Fitness", slug: "sports-fitness" },
  { name: "Grocery", slug: "grocery" },
  { name: "Toys", slug: "toys" },
  { name: "Accessories", slug: "accessories" },
];

const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Puma", "Dell", "HP", "Lenovo", "Asus", "LG", "Whirlpool", "Bose", "JBL", "Logitech"];
const adjectives = ["Premium", "Ultra", "Smart", "Classic", "Modern", "Advanced", "Pro", "Elite", "Essential", "Comfort"];
const nouns = ["Device", "System", "Kit", "Set", "Edition", "Series", "Collection", "Gear", "Equipment", "Model"];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    const createdCategories = await Category.insertMany(categories);

    const sampleProducts = [];

    for (let i = 0; i < 100; i++) {
      const category = createdCategories[i % createdCategories.length];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      
      const price = Math.floor(Math.random() * 990) + 10;
      const hasDiscount = Math.random() > 0.7;
      const discountPrice = hasDiscount ? price - Math.floor(price * 0.2) : undefined;
      
      sampleProducts.push({
        name: `${brand} ${adj} ${category.name} ${noun} ${Math.floor(Math.random() * 1000)}`,
        image: `https://picsum.photos/seed/${i}/600/600`,
        brand: brand,
        category: category._id,
        description: `Experience the best of ${category.name} with this ${adj.toLowerCase()} product from ${brand}. Features include high quality materials, modern design, and advanced technology. Perfect for everyday use.`,
        price: price,
        discountPrice: discountPrice,
        countInStock: Math.floor(Math.random() * 100),
        rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
        numReviews: Math.floor(Math.random() * 500),
        featured: Math.random() > 0.8,
      });
    }

    await Product.insertMany(sampleProducts);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}