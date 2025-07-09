import { Request, Response } from "express";
import { client } from "../config/db";
import { generateEmaAdaptivePaper } from "../utils/ema_paper";

// MongoDB collections
const questionsCollection = client.db("Questions").collection("subjects");
const textbooksCollection = client.db("Textbooks").collection("content");

export const generatePaper = async (req: Request, res: Response) => {
  try {
    const { studentId, classNum, subject, topicEmaMap } = req.body;
    if (!studentId || !classNum || !subject || !topicEmaMap) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const paper = await generateEmaAdaptivePaper(
      questionsCollection,
      textbooksCollection,
      studentId,
      classNum,
      subject,
      topicEmaMap
    );
    res.json(paper);
  } catch (error) {
    console.error("Error generating paper:", error);
    res.status(500).json({ error: "Failed to generate paper" });
  }
};
