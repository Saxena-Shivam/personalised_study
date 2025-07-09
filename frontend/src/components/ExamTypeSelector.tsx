import React from "react";

interface ExamType {
  exam_type: string;
  date: string;
}

interface Props {
  exams: ExamType[];
  value: string;
  onChange: (v: string) => void;
}

export const ExamTypeSelector: React.FC<Props> = ({
  exams,
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Exam</option>
    {exams.map((e) => (
      <option key={e.exam_type} value={e.exam_type}>
        {e.exam_type} ({e.date})
      </option>
    ))}
  </select>
);
