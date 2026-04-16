import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { messages, system } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    // Filter out the initial assistant greeting from message history
    const chatMessages = (messages || []).filter(
      (m) => !(m.role === "assistant" && m.content.includes("Hi! I am NOVA"))
    );

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system || "You are a helpful assistant." },
        ...chatMessages,
      ],
      max_tokens: 1000,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No reply from OpenAI" });
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("SERVER CRASH:", err);
    return res.status(500).json({ error: err.message });
  }
}