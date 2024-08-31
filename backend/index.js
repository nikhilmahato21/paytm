import express from "express";
import cors from "cors";
import mongoose from "mongoose"; 
import userRouter from "./routes/userRouter.js";
import * as dotenv from "dotenv";
import accountRouter from "./routes/accountRouter.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account",accountRouter);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}..`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
