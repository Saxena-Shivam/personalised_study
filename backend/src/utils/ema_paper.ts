import { Collection } from "mongodb";
import { getDifficultyDistribution } from "./emaUtils";
import { getQuestionsFromDB } from "./questions";
import { fetchTextbookContent } from "./textbookUtils";
import { generateAIQuestion } from "./ai_question";
import { calculateEMA } from "./emaUtils";
/**
 * Generates an EMA-adaptive paper for a student.
 */
export async function generateEmaAdaptivePaper(
  questionsCollection: Collection,
  textbooksCollection: Collection,
  studentId: string,
  classNum: number,
  subject: string,
  topicEmaMap: Record<string, number | null>
) {
  const result: any = {
    student_id: studentId,
    class: classNum,
    subject,
    generated_on: new Date().toISOString().split("T")[0],
    question_strategy: "ema_adaptive",
    questions: [],
  };
  const usedQuestions = new Set<string>();

  for (const [topic, ema] of Object.entries(topicEmaMap)) {
    // Decide number of questions per topic based on EMA
    let totalQuestions = 6;
    if (ema === null || ema === undefined) totalQuestions = 6;
    else if (ema < 50) totalQuestions = 10;
    else if (ema < 75) totalQuestions = 7;
    else totalQuestions = 5;

    const dist = getDifficultyDistribution(ema ?? null, totalQuestions);

    for (const [difficulty, count] of Object.entries(dist)) {
      const dbQuestions = await getQuestionsFromDB(
        questionsCollection,
        classNum,
        subject,
        topic,
        difficulty,
        count as number,
        usedQuestions
      );
      for (const q of dbQuestions) {
        result.questions.push({
          question_text: q.question,
          answer: q.answer || "",
          topic,
          difficulty,
          marks: q.marks,
          source: "DB",
        });
      }
      // If not enough, generate with AI
      if (dbQuestions.length < (count as number)) {
        const context = await fetchTextbookContent(
          textbooksCollection,
          classNum,
          subject,
          topic
        );
        for (let i = 0; i < (count as number) - dbQuestions.length; i++) {
          const aiQ = await generateAIQuestion(topic, 5, difficulty, context);
          result.questions.push({
            question_text: aiQ,
            answer: "",
            topic,
            difficulty,
            marks: 5,
            source: "AI",
          });
        }
      }
    }
  }
  return result;
}
