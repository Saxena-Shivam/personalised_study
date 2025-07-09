import { Router, Request, Response } from "express";
import { client } from "../config/db";
import { fetchLastTwoExamScores } from "../utils/previous_exams";

const router = Router();
const studentsCollection = client.db("Students").collection("students");

router.get("/last2-exams", async (req: Request, res: Response) => {
  try {
    const { studentId, subject, topic, uptoDate } = req.query;
    if (!studentId || !subject || !topic) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const scores = await fetchLastTwoExamScores(
      studentsCollection,
      studentId as string,
      subject as string,
      topic as string,
      uptoDate as string | undefined
    );
    res.json({ scores });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam scores" });
  }
});

export default router;
