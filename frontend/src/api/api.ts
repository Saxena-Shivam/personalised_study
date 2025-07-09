const API_BASE = "http://localhost:5000/api";
fetch(`${API_BASE}/students`);
export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/students`);
  return res.json();
}

export async function fetchSubjects(studentId: string) {
  const res = await fetch(`${API_BASE}/students/${studentId}/subjects`);
  return res.json();
}

export async function fetchExams(studentId: string, subject: string) {
  const res = await fetch(
    `${API_BASE}/students/${studentId}/subjects/${subject}/exams`
  );
  return res.json();
}

export async function generatePaper(payload: any) {
  const res = await fetch(`${API_BASE}/paper/generate-paper`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
