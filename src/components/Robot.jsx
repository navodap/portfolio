import { useEffect, useState } from "react"

const messages = [
  { section: "hero", text: "Hi! I am NOVA, your guide!" },
  { section: "about", text: "Learn more about Navoda!" },
  { section: "skills", text: "Wow, so many skills!" },
  { section: "projects", text: "Check out these cool projects!" },
  { section: "contact", text: "Say hello to Navoda!" },
]

export default function Robot() {
  const [msg, setMsg] = useState(messages[0].text)
  const [visible, setVisible] = useState(true)
  const [wave, setWave] = useState(false)
  const [blink, setBlink] = useState(false)
  const [talking, setTalking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setWave(true)
    setTimeout(() => setWave(false), 1000)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const sections = messages.map(m => ({
        ...m,
        el: document.getElementById(m.section),
      }))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el
        if (el && window.scrollY >= el.offsetTop - 300) {
          if (msg !== sections[i].text) {
            setTalking(true)
            setTimeout(() => {
              setMsg(sections[i].text)
              setTalking(false)
            }, 300)
            setWave(true)
            setTimeout(() => setWave(false), 1000)
          }
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [msg])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {visible && (
        <div className={`bg-gray-900 border border-cyan-800 text-cyan-300 text-xs rounded-2xl rounded-br-none px-4 py-2 max-w-40 text-center font-mono shadow-lg shadow-cyan-900/20 transition-all duration-300 ${talking ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          {msg}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-900 border-r border-b border-cyan-800" style={{clipPath: "polygon(100% 0, 100% 100%, 0 100%)"}} />
        </div>
      )}

      <div
        className="cursor-pointer select-none"
        onClick={() => setVisible(v => !v)}
        title="Click to toggle messages"
      >
        <svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">

          <g style={{animation: "robotFloat 3s ease-in-out infinite"}}>

            <rect x="20" y="2" width="8" height="8" rx="2" fill="#22d3ee" opacity="0.8"/>
            <rect x="23" y="8" width="2" height="4" fill="#22d3ee" opacity="0.6"/>

            <rect x="10" y="12" width="44" height="30" rx="8" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>

            <rect x="16" y="20" width="10" height="8" rx="3" fill={blink ? "#0f172a" : "#22d3ee"} opacity="0.9"/>
            <rect x="38" y="20" width="10" height="8" rx="3" fill={blink ? "#0f172a" : "#22d3ee"} opacity="0.9"/>

            {!blink && <>
              <circle cx="21" cy="24" r="2" fill="white" opacity="0.6"/>
              <circle cx="43" cy="24" r="2" fill="white" opacity="0.6"/>
            </>}

            <rect x="22" y="33" width="20" height="4" rx="2" fill="#22d3ee" opacity="0.5"/>
            <rect x="26" y="33" width="4" height="4" rx="1" fill="#22d3ee" opacity="0.9"/>
            <rect x="34" y="33" width="4" height="4" rx="1" fill="#22d3ee" opacity="0.9"/>

            <rect x="2" y="14" width="10" height="18" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"
              style={{
                transformOrigin: "12px 14px",
                animation: wave ? "waveArm 0.5s ease-in-out 3" : "none"
              }}
            />
            <rect x="52" y="14" width="10" height="18" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>

            <rect x="18" y="42" width="12" height="20" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>
            <rect x="34" y="42" width="12" height="20" rx="4" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>

            <rect x="14" y="60" width="16" height="8" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>
            <rect x="34" y="60" width="16" height="8" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5"/>

            <circle cx="32" cy="18" r="2" fill="#22d3ee" opacity="0.4"/>
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes waveArm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-30deg); }
        }
      `}</style>
    </div>
  )
}
