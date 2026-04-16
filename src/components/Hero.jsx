import { useEffect, useState, useRef } from "react"
import photo from "../photo.jpg"

const roles = ["Full Stack Developer", "AI Engineer", "UI/UX Designer", "Mobile App Developer", "Computer Vision Expert"]

function ParticleNetwork() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const PARTICLE_COUNT = 80
    const CONNECTION_DIST = 150
    const MOUSE_DIST = 200

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const onMouseMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener("mousemove", onMouseMove)

    let frame
    function draw() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          p.vx += dx * 0.00008
          p.vy += dy * 0.00008
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      const mdx = mouse.current.x
      const mdy = mouse.current.y
      particles.forEach(p => {
        const dx = mdx - p.x
        const dy = mdy - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const opacity = (1 - dist / MOUSE_DIST) * 0.3
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mdx, mdy)
          ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      frame = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function TypingText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((index + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-5 md:px-6">
      <ParticleNetwork />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-10 pt-20 pb-10">

        {/* Text content */}
        <div className="flex-1 text-left w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-5 md:mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-widest uppercase">Available for hire</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-2 leading-none tracking-tight">
            Navoda
          </h1>
          <h1 className="text-5xl md:text-8xl font-bold mb-5 md:mb-6 leading-none tracking-tight">
            <span className="text-shimmer">Perera</span>
          </h1>

          <div className="text-lg md:text-2xl font-semibold mb-6 md:mb-8 h-8 md:h-10 flex items-center">
            <TypingText />
          </div>

          <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 max-w-lg leading-relaxed" style={{ fontWeight: 300 }}>
            Passionate Computer Engineering undergrad at University of Peradeniya, crafting AI-powered solutions and intelligent systems that make a real difference.
          </p>

          {/* Buttons — stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4 md:mt-6">
            <button
              className="btn-primary px-6 py-3 rounded-lg text-sm md:text-base"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </button>
            <a href="/cv.pdf" download className="btn-primary px-6 py-3 rounded-lg text-center text-sm md:text-base">
              Download CV
            </a>
            <button
              className="btn-primary px-6 py-3 rounded-lg text-sm md:text-base"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10 text-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400">5+</h3>
              <p className="text-xs md:text-sm text-gray-400">Projects</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-blue-400">8+</h3>
              <p className="text-xs md:text-sm text-gray-400">Technologies</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-violet-400">24h</h3>
              <p className="text-xs md:text-sm text-gray-400">Response</p>
            </div>
          </div>
        </div>

        {/* Photo — hidden on mobile, shown on md+ */}
        <div className="hidden md:flex flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-rotateSlow" style={{
              background: "conic-gradient(from 0deg, #22d3ee, #3b82f6, #a78bfa, #22d3ee)",
              padding: "2px",
              borderRadius: "50%",
              filter: "blur(1px)",
            }} />
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full animate-rotateSlow" style={{
                background: "conic-gradient(from 0deg, #22d3ee40, #3b82f640, #a78bfa40, #22d3ee40)",
                padding: "3px",
                borderRadius: "50%",
              }} />
              <div className="absolute inset-1 rounded-full bg-gray-950" />
              <div className="absolute inset-3 rounded-full overflow-hidden">
                <img src={photo} alt="Navoda Perera" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 px-4 py-2 bg-gray-900/70 border border-cyan-500/30 rounded-xl text-xs font-mono backdrop-blur animate-float hover:scale-110 transition-all duration-300" style={{ animationDelay: "0s" }}>
              Robotics
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gray-900/70 border border-blue-500/30 rounded-xl text-xs font-mono backdrop-blur animate-float hover:scale-110 transition-all duration-300" style={{ animationDelay: "1s" }}>
              Web Dev
            </div>
            <div className="absolute top-1/2 -right-8 px-3 py-2 bg-gray-900/70 border border-violet-500/30 rounded-xl text-xs font-mono backdrop-blur animate-float hover:scale-110 transition-all duration-300" style={{ animationDelay: "2s" }}>
              AI
            </div>
            <div className="absolute top-0 -left-8 px-3 py-2 bg-gray-900/70 border border-cyan-500/30 rounded-xl text-xs font-mono backdrop-blur animate-float hover:scale-110 transition-all duration-300" style={{ animationDelay: "0.5s" }}>
              ML
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-gray-600 text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
      </div>
    </section>
  )
}