import { Router, Request, Response } from "express";
import { client } from "../config/db";
import { getQuestionsFromDB } from "../utils/questions";

const router = Router();
const questionsCollection = client.db("Questions").collection("subjects");

router.get("/questions", async (req: Request, res: Response) => {
  try {
    const classNum = parseInt(req.query.classNum as string, 10);
    const subject = req.query.subject as string;
    const topic = req.query.topic as string;
    const difficulty = req.query.difficulty as string;
    const count = parseInt(req.query.count as string, 10);

    if (isNaN(classNum) || !subject || !topic || !difficulty || isNaN(count)) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    // Used questions can be passed as a comma-separated string (optional)
    const used = (req.query.usedQuestions as string) || "";
    const usedQuestions = new Set<string>(used ? used.split(",") : []);

    const questions = await getQuestionsFromDB(
      questionsCollection,
      classNum,
      subject,
      topic,
      difficulty,
      count,
      usedQuestions
    );

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

export default router;
