// services/ai.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL || "https://api.openai.com/v1",
});

/**
 * Generate a smart reply using OpenAI
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateReply(systemPrompt, conversationHistory) {
  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    max_tokens: 150,
    temperature: 0.7,
  });
  return response.choices[0].message.content.trim();
}
