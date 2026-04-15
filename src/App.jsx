import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"

import Projects from "./components/Projects"
import Availability from "./components/Availability"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Chatbot from "./components/Chatbot"
import Robot from "./components/Robot"

function CursorGlow() {
  useEffect(() => {
    const cursor = document.getElementById("cursor-glow")
    const move = e => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])
  return (
    <div
      id="cursor-glow"
      className="fixed pointer-events-none z-40 w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }}
    />
  )
}



function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100 }
        return p + 2
      })
    }, 25)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="text-shimmer">Navoda Perera</span>
        </div>
        <div className="text-center text-gray-600 font-mono text-xs mt-2 tracking-widest">PORTFOLIO</div>
      </div>
      <div className="w-64 h-px bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-700 font-mono text-xs">{String(progress).padStart(3, "0")}%</p>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className={`bg-gray-950 text-gray-100 min-h-screen transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        <CursorGlow />
        <Robot />
        <Chatbot />
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.05),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_50%,rgba(59,130,246,0.04),transparent)]" />
        </div>
          <Navbar />
          <Hero />
        <div className="relative z-10 flex flex-col items-center">
          <About />
          <Services />
          
          <Projects />
          <Availability />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  )
}