import { Groq } from "groq-sdk";
const groqApiKey = process.env.GROQ_API_KEY as string;
const client1 = new Groq({ apiKey: groqApiKey });

export async function generateAIQuestion(
  topic: string,
  marks: number,
  difficulty: string,
  context: string
): Promise<string> {
  const prompt = `
Generate a ${difficulty}-level question about ${topic} for ${marks} marks based on the following content:
${context}
Provide only the question text, no additional explanations.
  `;
  try {
    const response = await client1.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    // Adjust this if your SDK's response shape is different
    const messageContent = response.choices?.[0]?.message?.content;
    return messageContent
      ? messageContent.trim()
      : "AI Question Generation Error: No content returned.";
  } catch (e: any) {
    return `AI Question Generation Error: ${e.message || String(e)}`;
  }
}
