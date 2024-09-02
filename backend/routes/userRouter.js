import { Router } from "express";
import zod from "zod";
import User, { Account } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware.js";
const router = Router();

const signupSchema = zod.object({
  username: zod.string().min(1, { message: "Email is required" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  firstName: zod.string().min(1, { message: "First name is required" }),
  lastName: zod.string().min(1, { message: "Last name is required" }),
});
router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
      return res.status(400).json({
        message: "Incorrect inputs",
      });
    }

    const existingUser = await User.findOne({
      username: body.username,
    });

    if (existingUser) {
      throw new Error("Email already taken");
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Update the body object with the hashed password
    body.password = hashedPassword;
    const newUser = await User.create(body);
    const userId = newUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    res.status(201).json({
      message: "User created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during signup.",
      error: error.message,
    });
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    // Validate request body
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Incorrect inputsxxx",
      });
    }

    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during signin.",
      error: error.message,
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    _id: { $ne: req.userId },
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/current-user", authMiddleware, async (req, res) => {
  try {
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Send the user data and the account balance in the response
    res.status(200).json({
      user,
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
