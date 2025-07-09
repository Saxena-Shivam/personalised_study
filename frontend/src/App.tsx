import React, { useEffect, useState } from "react";
import {
  fetchStudents,
  fetchSubjects,
  fetchExams,
  generatePaper,
} from "./api/api";
import { StudentSelector } from "./components/StudentSelector";
import { SubjectSelector } from "./components/SubjectSelector";
import { ExamTypeSelector } from "./components/ExamTypeSelector";
import { PaperDisplay } from "./components/PaperDisplay";
import { DownloadButtons } from "./components/DownloadButtons";

function App() {
  const [students, setStudents] = useState<any[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [exams, setExams] = useState<any[]>([]);
  const [examType, setExamType] = useState("");
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents().then((data) => setStudents(data.students));
  }, []);

  useEffect(() => {
    if (studentId) {
      fetchSubjects(studentId).then((data) => setSubjects(data.subjects));
      setSubject("");
      setExams([]);
      setExamType("");
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId && subject) {
      fetchExams(studentId, subject).then((data) => setExams(data.exams));
      setExamType("");
    }
  }, [subject, studentId]);

  const handleGenerate = async () => {
    setLoading(true);
    // You may want to fetch topic_ema_map from your backend or calculate here
    // For demo, we'll use a placeholder
    const topicEmaMap = { "Linear Equations": 60, Mensuration: 80 };
    const classNum =
      students.find((s) => s.student_id === studentId)?.class || 8;
    const payload = {
      studentId,
      classNum,
      subject,
      topicEmaMap,
    };
    const result = await generatePaper(payload);
    setPaper(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center tracking-tight">
          EMA Adaptive Question Paper Generator
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <StudentSelector
              students={students}
              value={studentId}
              onChange={setStudentId}
            />
          </div>
          <div className="flex-1">
            <SubjectSelector
              subjects={subjects}
              value={subject}
              onChange={setSubject}
            />
          </div>
          <div className="flex-1">
            <ExamTypeSelector
              exams={exams}
              value={examType}
              onChange={setExamType}
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !studentId || !subject}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-lg shadow transition-colors ${
            loading || !studentId || !subject
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating..." : "Generate EMA Adaptive Paper"}
        </button>
        <div className="mt-10">
          <PaperDisplay paper={paper} />
          <DownloadButtons paper={paper} />
        </div>
      </div>
      <footer className="text-center text-xs text-gray-400 mt-8 mb-2">
        &copy; {new Date().getFullYear()} EMA Adaptive Paper Generator
      </footer>
    </div>
  );
}

export default App;
