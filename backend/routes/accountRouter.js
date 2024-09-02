import { Account } from "../db.js";
import { Router } from "express";
import zod from "zod";
import authMiddleware from "../middleware.js";
import { mongoose } from "mongoose";

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transfer successful" });
  } catch (error) {
    // Abort the transaction and handle the error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Transfer failed", error: error.message });
  }
});

router.post("/add-money", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  try {
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: amount } }
    );
    res.json({ message: "Money added successfully" });
  } catch (error) {
    console.error("Error adding money:", error);
    res
      .status(500)
      .json({ message: "Failed to add money", error: error.message });
  }
});

export default router;
