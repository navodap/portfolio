import { useState, useRef, useEffect } from "react"

const TREE = {
  start: {
    message: "Hi! I'm NOVA, Navoda's  assistant! What would you like to know? 🤖",
    options: [
      { label: "🛠️ Skills & Tech Stack", next: "skills" },
      { label: "💼 Projects", next: "projects" },
      { label: "🎯 Services", next: "services" },
      { label: "📬 Contact Navoda", next: "contact" },
      { label: "👨‍💻 About Navoda", next: "about" },
    ],
  },
  skills: {
    message: "Navoda is skilled in a range of technologies! 💡 Which area interests you?",
    options: [
      { label: "🌐 Web Development", next: "skills_web" },
      { label: "🤖 AI & Computer Vision", next: "skills_ai" },
      { label: "📱 Mobile & Hardware", next: "skills_mobile" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  skills_web: {
    message: "For web dev, Navoda works with React, JavaScript, Tailwind CSS, and Next.js. He builds fast, modern, responsive websites! 🌐",
    options: [
      { label: "🤖 AI & Computer Vision", next: "skills_ai" },
      { label: "💼 See related projects", next: "projects" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  skills_ai: {
    message: "In AI & CV, Navoda uses Python, TensorFlow, OpenCV, and MediaPipe. He's built real gesture recognition systems! 🤖",
    options: [
      { label: "🌐 Web Development", next: "skills_web" },
      { label: "💼 See AI projects", next: "projects_ai" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  skills_mobile: {
    message: "Navoda also works with mobile app development and hardware projects using Arduino and C/C++! 📱⚙️",
    options: [
      { label: "💼 See hardware projects", next: "projects_hardware" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  projects: {
    message: "Navoda has built some awesome projects! 🚀 Which type interests you?",
    options: [
      { label: "🤖 AI / CV Projects", next: "projects_ai" },
      { label: "🌐 Web Projects", next: "projects_web" },
      { label: "⚙️ Hardware Projects", next: "projects_hardware" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  projects_ai: {
    message: "🤖 GestureX — A computer vision app that controls your PC using hand gestures via MediaPipe & OpenCV.\n\n🧠 BizPilot AI — An AI-powered tool that helps small businesses with smart insights and automation.",
    options: [
      { label: "🌐 Web Projects", next: "projects_web" },
      { label: "⚙️ Hardware Projects", next: "projects_hardware" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  projects_web: {
    message: "🌐 UniPartner — An AI web app connecting university students for collaboration.\n\n✈️ GoTravel — A travel planning web app with a clean modern UI built with React & Tailwind.",
    options: [
      { label: "🤖 AI / CV Projects", next: "projects_ai" },
      { label: "⚙️ Hardware Projects", next: "projects_hardware" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  projects_hardware: {
    message: "⚙️ Line Following Robot — An Arduino-based robot that autonomously follows a line path using sensors and C/C++ logic.",
    options: [
      { label: "🤖 AI / CV Projects", next: "projects_ai" },
      { label: "🌐 Web Projects", next: "projects_web" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  services: {
    message: "Navoda offers these services! 🎯 What are you interested in?",
    options: [
      { label: "🌐 Web Development", next: "services_web" },
      { label: "🎨 UI/UX Design", next: "services_uiux" },
      { label: "📱 Mobile App Dev", next: "services_mobile" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  services_web: {
    message: "Navoda builds modern, responsive websites and web apps using React, Next.js, and Tailwind CSS. Available for freelance projects! 🌐",
    options: [
      { label: "💰 Pricing info", next: "pricing" },
      { label: "📬 Contact Navoda", next: "contact" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  services_uiux: {
    message: "Navoda designs clean, modern UI/UX with a focus on user experience and aesthetic appeal. He can bring your ideas to life! 🎨",
    options: [
      { label: "💰 Pricing info", next: "pricing" },
      { label: "📬 Contact Navoda", next: "contact" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  services_mobile: {
    message: "Navoda develops mobile apps and is open to collaborations on exciting mobile projects! 📱",
    options: [
      { label: "💰 Pricing info", next: "pricing" },
      { label: "📬 Contact Navoda", next: "contact" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  pricing: {
    message: "Pricing depends on project scope and requirements. Use the contact form on the portfolio to discuss your project and get a custom quote! 💰",
    options: [
      { label: "📬 Contact Navoda", next: "contact" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  contact: {
    message: "You can reach Navoda through the contact form on this portfolio website! He's based in Sri Lanka and available for remote work worldwide. 🌍",
    options: [
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
  about: {
    message: "Navoda Perera is a Computer Engineering student at University of Peradeniya, Sri Lanka (Semester 3). He's passionate about AI, web dev, and building cool things! 🎓",
    options: [
      { label: "🛠️ His skills", next: "skills" },
      { label: "💼 His projects", next: "projects" },
      { label: "📬 Contact him", next: "contact" },
      { label: "⬅️ Back to menu", next: "start" },
    ],
  },
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: TREE.start.message, options: TREE.start.options },
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const handleOption = (option) => {
    const next = TREE[option.next]
    if (!next) return

    setMessages((prev) => [
      // Hide options from all previous messages
      ...prev.map((m) => ({ ...m, options: null })),
      // Add user selection as a message
      { role: "user", content: option.label },
      // Add bot response with new options
      { role: "assistant", content: next.message, options: next.options },
    ])
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
            height: "480px",
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
              <div key={i} className="flex flex-col gap-2">
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[85%] whitespace-pre-line"
                    style={
                      msg.role === "user"
                        ? { background: "rgba(34,211,238,0.12)", color: "#e2e8f0", border: "1px solid rgba(34,211,238,0.2)" }
                        : { background: "#161b27", color: "#94a3b8", border: "1px solid #1e2433" }
                    }
                  >
                    {msg.content}
                  </div>
                </div>

                {/* Option buttons */}
                {msg.options && (
                  <div className="flex flex-col gap-1.5 ml-1">
                    {msg.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => handleOption(opt)}
                        className="text-left text-xs px-3 py-2 rounded-lg transition-all duration-150"
                        style={{
                          background: "rgba(34,211,238,0.06)",
                          border: "1px solid rgba(34,211,238,0.15)",
                          color: "#22d3ee",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(34,211,238,0.15)"
                          e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(34,211,238,0.06)"
                          e.currentTarget.style.borderColor = "rgba(34,211,238,0.15)"
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2 text-center"
            style={{ borderTop: "1px solid #1e2433", background: "#080c14" }}
          >
            <p className="text-[10px] text-slate-600">Tap an option above to explore ✨</p>
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