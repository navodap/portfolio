import { useRef, useEffect, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const projects = [
  {
    title: "GestureX",
    category: "ai",
    year: "2024",
    description: "Real-time hand gesture detection using computer vision. Lets users control interfaces without touching a screen.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    github: "#",
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,0.06)",
    accentBorder: "rgba(34,211,238,0.2)",
    index: "01",
  },
  {
    title: "UniPartner",
    category: "web",
    year: "2024",
    description: "AI-powered web app that matches university students with ideal project partners based on skills and interests.",
    tags: ["React", "Node.js", "AI"],
    github: "#",
    accent: "#818cf8",
    accentBg: "rgba(129,140,248,0.06)",
    accentBorder: "rgba(129,140,248,0.2)",
    index: "02",
  },
  {
    title: "GoTravel",
    category: "web",
    year: "2023",
    description: "Smart travel planning web app. Plan full itineraries, discover places, and manage trips in one place.",
    tags: ["React", "Tailwind", "Maps API"],
    github: "#",
    accent: "#2dd4bf",
    accentBg: "rgba(45,212,191,0.06)",
    accentBorder: "rgba(45,212,191,0.2)",
    index: "03",
  },
  {
    title: "Line Following Robot",
    category: "robotics",
    year: "2023",
    description: "Autonomous Arduino robot using IR sensors to follow lines on a track with high precision and speed.",
    tags: ["Arduino", "C++", "IR Sensors"],
    github: "#",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.06)",
    accentBorder: "rgba(251,146,60,0.2)",
    index: "04",
  },
  {
    title: "BizPilot AI",
    category: "ai",
    year: "2024",
    description: "AI assistant designed for small and medium enterprises. Automates reports, answers queries, and tracks metrics.",
    tags: ["Python", "LangChain", "FastAPI"],
    github: "#",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.06)",
    accentBorder: "rgba(167,139,250,0.2)",
    index: "05",
  },
]

const categories = [
  {
    id: "all",
    label: "All Projects",
    count: projects.length,
    accent: "#22d3ee",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "ai",
    label: "AI / CV",
    count: projects.filter(p => p.category === "ai").length,
    accent: "#22d3ee",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "web",
    label: "Web Dev",
    count: projects.filter(p => p.category === "web").length,
    accent: "#818cf8",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 9l3 3-3 3M12 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "robotics",
    label: "Robotics",
    count: projects.filter(p => p.category === "robotics").length,
    accent: "#fb923c",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="8" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 8V6a2 2 0 114 0v2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="12" r="1" fill="currentColor"/>
        <circle cx="14" cy="12" r="1" fill="currentColor"/>
        <path d="M10 16h4M4 13h3M17 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView()
  const cardRef = useRef(null)

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -6
    const rotateY = ((x - rect.width / 2) / rect.width) * 6
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)"
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "#0d1117",
          border: `1px solid #1e2433`,
          transition: "transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        className="rounded-2xl p-6 flex flex-col h-full group cursor-default"
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = project.accentBorder
          e.currentTarget.style.boxShadow = `0 20px 60px ${project.accent}15`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "#1e2433"
          e.currentTarget.style.boxShadow = "none"
          handleMouseLeave()
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <span style={{ color: project.accent, background: project.accentBg, border: `1px solid ${project.accentBorder}` }}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-widest uppercase">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-600">{project.year}</span>
        </div>

        {/* Index + title */}
        <div className="mb-4">
          <span className="text-[11px] font-mono text-slate-700 block mb-1">{project.index}</span>
          <h3 className="text-[22px] font-bold text-white leading-tight">{project.title}</h3>
        </div>

        {/* Divider */}
        <div style={{ background: `linear-gradient(90deg, ${project.accent}40, transparent)` }}
          className="h-px w-full mb-4" />

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag}
              style={{ color: project.accent, background: project.accentBg, border: `1px solid ${project.accentBorder}` }}
              className="px-2 py-0.5 rounded text-[11px] font-mono">
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a href={project.github}
          style={{ color: project.accent }}
          className="inline-flex items-center gap-1.5 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity duration-200 w-fit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useInView()
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden" style={{ background: "#080c14" }}>
      {/* Background blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 mb-20  ${headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-cyan-400 font-mono text-[11px] mb-2 tracking-widest uppercase">What I have built</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl font-bold text-white">
              Projects<span className="text-cyan-400">.</span>
            </h2>
            <span className="text-slate-600 font-mono text-sm">{projects.length} total</span>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-14">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={isActive ? {
                  background: `rgba(34,211,238,0.08)`,
                  border: `1px solid rgba(34,211,238,0.3)`,
                  color: "#22d3ee",
                } : {
                  background: "transparent",
                  border: "1px solid #1e2433",
                  color: "#475569",
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:border-slate-600 hover:text-slate-300"
              >
                <span style={{ opacity: isActive ? 1 : 0.5 }}>{cat.icon}</span>
                {cat.label}
                <span style={isActive ? {
                  background: "rgba(34,211,238,0.15)",
                  color: "#22d3ee",
                } : {
                  background: "#1e2433",
                  color: "#475569",
                }}
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
