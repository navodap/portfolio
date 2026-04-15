const send = async () => {
  if (!input.trim() || loading) return;

  const userMsg = { role: "user", content: input };
  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
        system: SYSTEM_PROMPT,
      }),
    });

    const data = await response.json();

    let reply =
      data.reply ||
      data.error ||
      "Sorry, I could not get a response! 🤖";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong. Please try again! 🤖",
      },
    ]);
  }

  setLoading(false);
};