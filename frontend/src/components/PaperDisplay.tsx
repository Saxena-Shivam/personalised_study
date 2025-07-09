import React from "react";

export const PaperDisplay: React.FC<{ paper: any }> = ({ paper }) => {
  if (!paper || !Array.isArray(paper.questions)) return null;
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow mt-4">
      <div className="mb-4 text-gray-700">
        <b>Student ID:</b> {paper.student_id} &nbsp;
        <b>Class:</b> {paper.class} &nbsp;
        <b>Subject:</b> {paper.subject} &nbsp;
        <b>Generated on:</b> {paper.generated_on}
      </div>
      <ul className="space-y-4">
        {paper.questions.map((q: any, idx: number) => (
          <li
            key={idx}
            className={`p-4 rounded border-l-4 ${
              q.source === "AI"
                ? "border-blue-400 bg-blue-50"
                : "border-green-400 bg-green-50"
            }`}
          >
            <div className="font-semibold text-lg mb-1">
              {q.topic} [{q.difficulty}] ({q.marks} marks)
            </div>
            <div className="mb-2">{q.question_text}</div>
            <div className="text-xs text-gray-500">
              Source:{" "}
              <span
                className={
                  q.source === "AI" ? "text-blue-600" : "text-green-600"
                }
              >
                {q.source}
              </span>
              {q.answer && (
                <>
                  {" | "}Answer:{" "}
                  <span className="text-gray-700">{q.answer}</span>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
