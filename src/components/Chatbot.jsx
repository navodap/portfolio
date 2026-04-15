import { useState, useRef, useEffect } from "react"

const SYSTEM_PROMPT = `You are NOVA, Navoda Perera's AI assistant on his portfolio website.
About Navoda Perera:
- Computer Engineering student at University of Peradeniya, Sri Lanka (Semester 3)
- Offers Web Development, UI/UX Design, and Mobile App development services
- Skills: React, JavaScript, Python, Tailwind CSS, Computer Vision, AI/ML, Arduino, C/C++, OpenCV, MediaPipe, TensorFlow
- Projects: GestureX (Computer Vision), UniPartner (AI web app), GoTravel (travel web app), Line Following Robot (Arduino), BizPilot AI (AI for SMEs)
- Open to freelance work and collaborations
- Based in Sri Lanka, available for remote work worldwide
- Contact: available through the contact form on this portfolio
Answer questions about Navoda briefly and enthusiastically. Keep answers under 3 sentences. If asked about pricing, say to use the contact form. If asked something unrelated to Navoda, politely redirect. Always end with an emoji.`

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am NOVA, Navoda's AI assistant! Ask me anything about Navoda's skills, projects, or services 🤖",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const send = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: "user", content: input }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          system: SYSTEM_PROMPT,
        }),
      })

      const data = await response.json()

      const reply =
        data.reply ||
        data.error ||
        "Sorry, I could not get a response! 🤖"

      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again! 🤖" },
      ])
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-colors duration-200 flex items-center justify-center shadow-lg shadow-cyan-500/30"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.7 1.22 5.12 3.17 6.83L4 22l4.42-1.47C9.55 20.83 10.75 21 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M8 11h.01M12 11h.01M16 11h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "#0d1117",
            border: "1px solid #1e2433",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            height: "420px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: "1px solid #1e2433", background: "#080c14" }}
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="8" width="10" height="9" rx="2" stroke="#22d3ee" strokeWidth="1.5"/>
                <path d="M10 8V6a2 2 0 114 0v2" stroke="#22d3ee" strokeWidth="1.5"/>
                <circle cx="10" cy="12" r="1" fill="#22d3ee"/>
                <circle cx="14" cy="12" r="1" fill="#22d3ee"/>
                <path d="M10 16h4M4 13h2M18 13h2" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none mb-0.5">NOVA</p>
              <p className="text-cyan-400 text-[10px] font-mono">Navoda's AI Assistant</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-slate-500">online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[85%]"
                  style={
                    msg.role === "user"
                      ? { background: "rgba(34,211,238,0.12)", color: "#e2e8f0", border: "1px solid rgba(34,211,238,0.2)" }
                      : { background: "#161b27", color: "#94a3b8", border: "1px solid #1e2433" }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-xl flex items-center gap-1.5"
                  style={{ background: "#161b27", border: "1px solid #1e2433" }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-3 flex items-center gap-2"
            style={{ borderTop: "1px solid #1e2433", background: "#080c14" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Navoda..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: input.trim() ? "rgba(34,211,238,0.15)" : "transparent",
                border: "1px solid",
                borderColor: input.trim() ? "rgba(34,211,238,0.3)" : "#1e2433",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke={input.trim() ? "#22d3ee" : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}