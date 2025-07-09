import { Collection } from "mongodb";

/**
 * Returns the last two percentage scores for a topic in a subject for a student,
 * considering only exams before uptoDate (if provided).
 */
export async function fetchLastTwoExamScores(
  studentsCollection: Collection,
  studentId: string,
  subject: string,
  topic: string,
  uptoDate?: string // ISO date string, e.g. "2025-05-01"
): Promise<number[]> {
  const student = await studentsCollection.findOne({ student_id: studentId });
  if (!student || !Array.isArray(student.exams)) {
    return [];
  }
  let exams = student.exams.filter((e: any) => e.subject === subject);
  if (uptoDate) {
    exams = exams.filter((e: any) => e.date < uptoDate);
  }
  exams.sort((a: any, b: any) => (a.date < b.date ? 1 : -1)); // descending
  const scores: number[] = [];
  for (const exam of exams) {
    if (Array.isArray(exam.topic_scores)) {
      for (const t of exam.topic_scores) {
        if (t.topic === topic) {
          // If percentage is not stored, calculate it
          if (typeof t.percentage === "number") {
            scores.push(t.percentage);
          } else if (
            typeof t.marks_obtained === "number" &&
            typeof t.max_marks === "number" &&
            t.max_marks > 0
          ) {
            scores.push((t.marks_obtained / t.max_marks) * 100);
          }
        }
      }
    }
  }
  return scores.slice(0, 2);
}
