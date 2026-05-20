import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ message:"Invalid credentials"});
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({
            message: "Login successful",
            token,
            user,
        });
    }catch(error){
        res.status(500).json({ message:error.message });
    }
});

router.post("/google", async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    // Create user if not found
    if (!user) {
      const randomPassword = Math.random()
        .toString(36)
        .slice(-8);

      const hashedPassword = await bcrypt.hash(
        randomPassword,
        10
      );

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      message: "Google authentication failed",
    });
  }
});

export default router;