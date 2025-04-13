import { generateReply } from "../services/ai.js";
import { Memory } from "../services/memory.js";

export async function handleMessage(message, client) {
  const from = message.from;
  const targetNumbers = (process.env.TARGET_NUMBERS || "").split(",");

  if (!targetNumbers.includes(from)) return;

  try {
    const chat = await message.getChat();
    await chat.sendStateTyping();

    // Add user message to memory
    Memory.addMessage(from, "user", message.body);

    // Get conversation history
    const history = Memory.getHistory(from);

    // Use history to provide context for the AI
    const systemPrompt = `You are simulating a casual WhatsApp conversation with a close friend.
Reply in a friendly, conversational tone with occasional emojis. Keep it brief like texting.
Use casual language, sometimes with shortened words or text-speak.
Don't be overly formal or robotic. Act like you've known this person for years.`;

    const reply = await generateReply(systemPrompt, history);

    // Add AI response to memory
    Memory.addMessage(from, "assistant", reply);

    await message.reply(reply);
  } catch (err) {
    console.error("Message handling error:", err);
    await message.reply("⚠️ Sorry, I'm having trouble right now.");
  }
}
