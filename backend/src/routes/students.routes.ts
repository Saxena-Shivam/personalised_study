import { Router, Request, Response } from "express";
import { client } from "../config/db";
import {
  fetchAllStudents,
  fetchSubjectsForStudent,
  fetchExamTypesForStudentSubject,
} from "../utils/students";

const router = Router();
const studentsCollection = client.db("Students").collection("students");

// Get all students for dropdown
router.get("/students", async (_req: Request, res: Response) => {
  try {
    const students = await fetchAllStudents(studentsCollection);
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Get subjects for a student
router.get(
  "/students/:studentId/subjects",
  async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const subjects = await fetchSubjectsForStudent(
        studentsCollection,
        studentId
      );
      res.json({ subjects });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subjects" });
    }
  }
);

// Get exam types for a student and subject
router.get(
  "/students/:studentId/subjects/:subject/exams",
  async (req: Request, res: Response) => {
    try {
      const { studentId, subject } = req.params;
      const exams = await fetchExamTypesForStudentSubject(
        studentsCollection,
        studentId,
        subject
      );
      res.json({ exams });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exams" });
    }
  }
);

export default router;
