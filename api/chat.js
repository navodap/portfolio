export default async function handler(req, res) {
  try {
    console.log("FUNCTION STARTED");

    const { messages, system } = req.body || {};
    console.log("REQUEST BODY:", JSON.stringify(req.body));

    if (!process.env.GEMINI_API_KEY) {
      console.log("❌ MISSING API KEY");
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: system || "You are a helpful assistant." }],
      },
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

    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    return res.status(200).json({ debug: text });

  } catch (err) {
    console.error("SERVER CRASH:", err);
    return res.status(500).json({ error: err.message });
  }
}