import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const formatTextWithGemini = async (rawText: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert Markdown formatter. 
      Take the following raw text, which may be messy, unorganized, or lack proper Markdown syntax, 
      and convert it into clean, well-structured, professional Github-flavored Markdown.
      
      Rules:
      1. Fix indentation and spacing.
      2. Format code blocks with correct language tags if detected.
      3. Format tables properly.
      4. Use headers (H1, H2, H3) to structure the content logically.
      5. Fix lists (bullet/numbered).
      6. Do NOT add any preamble or "Here is the markdown" text. ONLY return the markdown content.
      
      Raw Text:
      ${rawText}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || rawText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};