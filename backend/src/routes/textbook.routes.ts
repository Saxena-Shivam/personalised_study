import { Router, Request, Response } from "express";
import { client } from "../config/db";
import { fetchTextbookContent } from "../utils/textbookUtils";

const router = Router();
const textbooksCollection = client.db("Textbooks").collection("content");

router.get(
  "/textbook-content/:classNum/:subjectName/:topic",
  async (req: Request, res: Response) => {
    try {
      const classNum = parseInt(req.params.classNum, 10);
      const subjectName = req.params.subjectName;
      const topic = req.params.topic;

      if (isNaN(classNum)) {
        return res.status(400).json({ error: "Invalid class number" });
      }

      const content = await fetchTextbookContent(
        textbooksCollection,
        classNum,
        subjectName,
        topic
      );
      res.json({ content });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch textbook content" });
    }
  }
);

export default router;
