import React from "react";

interface Props {
  students: any[];
  value: string;
  onChange: (v: string) => void;
}

export const StudentSelector: React.FC<Props> = ({
  students,
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Student</option>
    {students.map((s) => (
      <option key={s.student_id} value={s.student_id}>
        {s.student_id} - {s.name} (Class {s.class}, Roll {s.roll_number})
      </option>
    ))}
  </select>
);
