import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const { prompt } = await req.json();

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

  const result = await ai
    .getGenerativeModel({ model: "gemini-1.5-flash" })
    .generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  return Response.json({ text });
}
