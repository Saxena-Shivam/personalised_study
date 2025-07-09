import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paperRoutes from "./routes/paperRoutes";
import { connectDB } from "./config/db";
import textbookRoutes from "./routes/textbook.routes";
import questionsRoutes from "./routes/question.routes";
import last2ExamsRoutes from "./routes/preivious_exams.routes";
import studentsRoutes from "./routes/students.routes";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", last2ExamsRoutes);
app.use("/api", textbookRoutes);
app.use("/api", paperRoutes);
app.use("/api", questionsRoutes);
app.use("/api", studentsRoutes);
connectDB().then(() => {
  console.log("MongoDB connected");
});

export default app;
