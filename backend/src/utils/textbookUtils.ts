import { Collection } from "mongodb";

export async function fetchTextbookContent(
  textbooksCollection: Collection,
  classSelected: number,
  subjectSelected: string,
  topic: string
): Promise<string> {
  const doc = await textbooksCollection.findOne({
    class: classSelected,
    subject_name: subjectSelected,
    topic: topic,
  });
  return doc && doc.textbook ? String(doc.textbook).trim() : "";
}
