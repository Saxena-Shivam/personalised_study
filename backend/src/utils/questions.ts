import { Collection } from "mongodb";

export async function getQuestionsFromDB(
  questionsCollection: Collection,
  classSelected: number,
  subjectSelected: string,
  topic: string,
  difficulty: string,
  count: number,
  usedQuestions: Set<string>
): Promise<any[]> {
  try {
    const doc = await questionsCollection.findOne({
      class: classSelected,
      subject_name: subjectSelected,
    });
    if (!doc || !Array.isArray(doc.topics)) {
      return [];
    }
    // Find the topic object
    const topicObj = doc.topics.find(
      (t: any) => t.topic_name === topic || t.topic === topic
    );
    if (!topicObj || !Array.isArray(topicObj.questions)) {
      return [];
    }
    // Filter questions by difficulty and not in usedQuestions
    const pool = topicObj.questions.filter(
      (q: any) => q.difficulty === difficulty && !usedQuestions.has(q.question)
    );
    // Randomly select up to 'count' questions
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    // Add selected questions to usedQuestions set
    selected.forEach((q: any) => usedQuestions.add(q.question));
    return selected;
  } catch (e) {
    console.error("Error fetching questions from DB:", e);
    return [];
  }
}
