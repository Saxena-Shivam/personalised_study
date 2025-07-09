import React from "react";

export const DownloadButtons: React.FC<{ paper: any }> = ({ paper }) => {
  if (!paper || !Array.isArray(paper.questions)) return null;

  const text = paper.questions
    .map(
      (q: any, i: number) =>
        `${i + 1}. (${q.marks} marks, ${q.difficulty}) ${
          q.question_text
        }\nAnswer: ${q.answer || ""}\n`
    )
    .join("\n");

  const csv =
    "topic,question_text,marks,difficulty,source,answer\n" +
    paper.questions
      .map(
        (q: any) =>
          `"${q.topic}","${q.question_text.replace(/"/g, '""')}",${q.marks},${
            q.difficulty
          },${q.source},"${q.answer || ""}"`
      )
      .join("\n");

  return (
    <div className="flex gap-4 mt-4">
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
        download="ema_question_paper.txt"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download as Text
      </a>
      <a
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
        download="ema_question_details.csv"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Download as CSV
      </a>
    </div>
  );
};
