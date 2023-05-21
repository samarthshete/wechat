import express from "express";
import cors from "cors";

import { chats } from "./data/data.js";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

// routes
import authRouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

import connectDB from "./db/connect.js";

//routes
app.use("/api/auth", authRouter);
app.use("/api/chats", authenticateUser, chatRouter);

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Failed to connect", error);
  }
};
start();
