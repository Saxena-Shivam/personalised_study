import { Collection } from "mongodb";

// Fetch all students (for dropdown)
export async function fetchAllStudents(studentsCollection: Collection) {
  return studentsCollection
    .find(
      {},
      { projection: { student_id: 1, name: 1, class: 1, roll_number: 1 } }
    )
    .toArray();
}

// Fetch subjects for a student (from their exams)
export async function fetchSubjectsForStudent(
  studentsCollection: Collection,
  studentId: string
) {
  const student = await studentsCollection.findOne({ student_id: studentId });
  if (!student || !Array.isArray(student.exams)) return [];
  const subjects = [...new Set(student.exams.map((e: any) => e.subject))];
  return subjects;
}

// Fetch exam types for a student and subject
export async function fetchExamTypesForStudentSubject(
  studentsCollection: Collection,
  studentId: string,
  subject: string
) {
  const student = await studentsCollection.findOne({ student_id: studentId });
  if (!student || !Array.isArray(student.exams)) return [];
  const exams = student.exams.filter((e: any) => e.subject === subject);
  // Return exam_type and date for dropdown
  return exams.map((e: any) => ({
    exam_type: e.exam_type,
    date: e.date,
    exam_id: e.exam_id,
  }));
}
