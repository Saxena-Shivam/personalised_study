import express from "express";
import cors from "cors";
import { connectDB } from "./config/index";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});
connectDB();
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
