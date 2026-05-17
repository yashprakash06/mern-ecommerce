import mongoose from "mongoose";
import dotenv from "dotenv";

import products from "./data/product.js";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // delete old products
    await Product.deleteMany();

    // insert new products
    await Product.insertMany(products);

    console.log("Products Imported!");

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();