export default async function handler(req, res) {
  try {
    const { messages, system } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: system || "You are a helpful assistant." }],
      },
      { role: "model", parts: [{ text: "Understood! I'll follow those instructions." }] },
      ...(messages || []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content || "" }],
      })),
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    // Extract the reply text from Gemini's response structure
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Unexpected Gemini response:", JSON.stringify(data));
      return res.status(500).json({ error: "No reply from Gemini" });
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("SERVER CRASH:", err);
    return res.status(500).json({ error: err.message });
  }
}