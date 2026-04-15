import { useState, useRef, useEffect } from "react"

const SYSTEM_PROMPT = `You are NOVA, Navoda Perera's personal AI assistant on his portfolio website. You are a friendly, enthusiastic small robot assistant.

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
    { role: "assistant", content: "Hi! I am NOVA, Navoda's AI assistant! Ask me anything about Navoda's skills, projects, or services ??" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
       messages: [...messages, userMsg],
       system: SYSTEM_PROMPT,
         })
     
      })
      const data = await response.json()
      const reply = data.content?.[0]?.text || "Sorry, I could not get a response!"
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! Something went wrong. Try again! ??" }])
    }
    setLoading(false)
  }

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-4 w-80 bg-gray-900 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-cyan-900/20 flex flex-col overflow-hidden" style={{height: "420px"}}>
          <div className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 px-4 py-3 flex items-center justify-between border-b border-cyan-800/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 font-mono text-sm font-semibold">NOVA � AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors text-lg leading-none">�</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Navoda..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-xl text-sm transition-colors font-mono"
            >
              ?
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {open ? (
          <span className="text-white text-xl">�</span>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="8" width="20" height="14" rx="4" fill="white" opacity="0.9"/>
            <rect x="8" y="4" width="4" height="5" rx="1" fill="white" opacity="0.7"/>
            <rect x="16" y="4" width="4" height="5" rx="1" fill="white" opacity="0.7"/>
            <circle cx="10" cy="14" r="2" fill="#0ea5e9"/>
            <circle cx="18" cy="14" r="2" fill="#0ea5e9"/>
            <rect x="10" y="18" width="8" height="2" rx="1" fill="#0ea5e9" opacity="0.6"/>
          </svg>
        )}
      </button>
    </div>
  )
}
