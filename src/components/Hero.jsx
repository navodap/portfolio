import { useEffect, useRef, useState } from "react"

const PIXEL_SIZE = 7

function buildParticles(w, h) {
  const cols = Math.ceil(w / PIXEL_SIZE)
  const rows = Math.ceil(h / PIXEL_SIZE)
  const particles = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 120 + Math.random() * Math.max(w, h) * 0.9
      particles.push({
        ox: c * PIXEL_SIZE,
        oy: r * PIXEL_SIZE,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        // slight gold tint on scatter
        goldMix: Math.random() * 0.6,
      })
    }
  }
  return particles
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const progressRef = useRef(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Draw frame
  const draw = (progress) => {
    const canvas = canvasRef.current
    if (!canvas || !imgRef.current) return
    const ctx = canvas.getContext("2d")
    const W = canvas.width
    const H = canvas.height
    const p = easeInOut(Math.min(1, Math.max(0, progress)))

    ctx.clearRect(0, 0, W, H)

    const particles = particlesRef.current
    for (const pt of particles) {
      const x = pt.ox + pt.dx * p
      const y = pt.oy + pt.dy * p
      // Draw source pixel
      ctx.drawImage(imgRef.current, pt.ox, pt.oy, PIXEL_SIZE, PIXEL_SIZE, x, y, PIXEL_SIZE, PIXEL_SIZE)
      // Gold overlay tint as particles scatter
      if (p > 0.05) {
        ctx.fillStyle = `rgba(201,169,110,${pt.goldMix * p * 0.55})`
        ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE)
      }
    }
  }

  // Init canvas size and particles when image loads
  const initCanvas = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    particlesRef.current = buildParticles(img.naturalWidth, img.naturalHeight)
    draw(0)
    setImgLoaded(true)
  }

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const viewH = window.innerHeight
      // Start scatter when hero top reaches 20% up from bottom, complete when it exits top
      const start = viewH * 0.8
      const end = -rect.height * 0.3
      const raw = 1 - (rect.top - end) / (start - end)
      const clamped = Math.min(1, Math.max(0, raw))
      if (Math.abs(clamped - progressRef.current) > 0.002) {
        progressRef.current = clamped
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => draw(clamped))
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Animate in on mount
  useEffect(() => {
    if (!imgLoaded) return
    let start = null
    const duration = 1200
    const animate = (ts) => {
      if (!start) start = ts
      const t = Math.min(1, (ts - start) / duration)
      // Assemble from scattered state
      draw(1 - t)
      if (t < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [imgLoaded])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0e0e12" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#c9a96e" }} />
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "#c9a96e" }}
              >
                Full-Stack Developer
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-bold mb-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                color: "#f0ece4",
              }}
            >
              Navoda
              <br />
              <span style={{ color: "#c9a96e" }}>Perera</span>
            </h1>

            {/* Role */}
            <p
              className="mb-6 text-base font-mono tracking-wide"
              style={{ color: "#6e6458" }}
            >
              Building thoughtful digital experiences
            </p>

            {/* Description */}
            <p
              className="mb-10 leading-relaxed max-w-md"
              style={{ color: "#5a5248", fontSize: "0.95rem", lineHeight: 1.85 }}
            >
              I craft clean, performant web applications with a sharp eye for
              elegant design and robust engineering. Currently available for
              freelance &amp; full-time opportunities.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                style={{
                  padding: "12px 28px",
                  background: "#c9a96e",
                  color: "#0e0e12",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 4,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.target.style.opacity = 0.85}
                onMouseLeave={e => e.target.style.opacity = 1}
              >
                View work
              </a>
              <a
                href="#contact"
                style={{
                  padding: "12px 28px",
                  background: "transparent",
                  color: "#8a7f6e",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  borderRadius: 4,
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(201,169,110,0.4)"; e.target.style.color = "#c9a96e" }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "#8a7f6e" }}
              >
                Get in touch
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-10">
              {[
                { num: "3+", label: "Years exp." },
                { num: "20+", label: "Projects" },
                { num: "15+", label: "Clients" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "#c9a96e",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#4a4540", letterSpacing: "0.06em", marginTop: 4 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — pixel scatter photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative gold ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: "0.5px solid rgba(201,169,110,0.15)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -32,
                  borderRadius: "50%",
                  border: "0.5px solid rgba(201,169,110,0.06)",
                  pointerEvents: "none",
                }}
              />

              {/* Canvas — pixel scatter effect renders here */}
              <div
                style={{
                  width: "clamp(260px, 35vw, 420px)",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  border: "0.5px solid rgba(201,169,110,0.2)",
                }}
              >
                {/* Replace src with your actual photo path */}
                <img
                  ref={imgRef}
                  src="/your-photo.jpg"
                  alt="Navoda Perera"
                  onLoad={initCanvas}
                  style={{ display: "none" }}
                  crossOrigin="anonymous"
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
                {/* Fallback gradient shown until image loads */}
                {!imgLoaded && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at 50% 40%, #3d2a1e, #18171e, #0e0e12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "3rem",
                        fontWeight: 700,
                        color: "#c9a96e",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      NP
                    </span>
                  </div>
                )}
              </div>

              {/* Availability badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: -8,
                  background: "#18171e",
                  border: "0.5px solid rgba(201,169,110,0.25)",
                  borderRadius: 6,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                    boxShadow: "0 0 0 2px rgba(74,222,128,0.2)",
                  }}
                />
                <span style={{ fontSize: "0.68rem", color: "#8a7f6e", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Available
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{ transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
      >
        <span style={{ fontSize: "0.6rem", color: "#3a3530", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #c9a96e40, transparent)" }} />
      </div>
    </section>
  )
}
