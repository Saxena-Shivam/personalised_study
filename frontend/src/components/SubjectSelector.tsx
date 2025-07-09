import React from "react";

interface Props {
  subjects: string[];
  value: string;
  onChange: (v: string) => void;
}

export const SubjectSelector: React.FC<Props> = ({
  subjects,
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Subject</option>
    {subjects.map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ))}
  </select>
);
