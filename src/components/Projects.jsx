import { useRef, useEffect, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
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
    description:
      "Real-time hand gesture detection using computer vision. Lets users control interfaces without touching a screen.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,0.06)",
    accentBorder: "rgba(34,211,238,0.2)",
    index: "01",
  },
  {
    title: "UniPartner",
    category: "web",
    year: "2024",
    description:
      "AI-powered web app that matches university students with ideal project partners based on skills and interests.",
    tags: ["Html", "css", "JS"],
    accent: "#818cf8",
    accentBg: "rgba(129,140,248,0.06)",
    accentBorder: "rgba(129,140,248,0.2)",
    index: "02",
  },
  {
    title: "GoTravel",
    category: "web",
    year: "2023",
    description:
      "Smart travel planning web app. Plan full itineraries, discover places, and manage trips in one place.",
    tags: ["React", "Tailwind", "Maps API"],
    accent: "#2dd4bf",
    accentBg: "rgba(45,212,191,0.06)",
    accentBorder: "rgba(45,212,191,0.2)",
    index: "03",
  },
  {
    title: "Line Following Robot",
    category: "robotics",
    year: "2023",
    description:
      "Autonomous Arduino robot using IR sensors to follow lines on a track with high precision and speed.",
    tags: ["Arduino", "IR Sensors"],
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.06)",
    accentBorder: "rgba(251,146,60,0.2)",
    index: "04",
  },
  {
    title: "BizPilot AI",
    category: "ai",
    year: "2024",
    description:
      "AI assistant designed for small and medium enterprises. Automates reports, answers queries, and tracks metrics.",
    tags: ["Python", "LangChain", "FastAPI"],
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
  },
  {
    id: "ai",
    label: "AI / CV",
    count: projects.filter(p => p.category === "ai").length,
    accent: "#22d3ee",
  },
  {
    id: "web",
    label: "Web Dev",
    count: projects.filter(p => p.category === "web").length,
    accent: "#818cf8",
  },
  {
    id: "robotics",
    label: "Robotics",
    count: projects.filter(p => p.category === "robotics").length,
    accent: "#fb923c",
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
      className={`transition-all duration-600 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
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
        className="rounded-2xl p-6 flex flex-col h-full group"
      >
        {/* Top row */}
        <div className="flex justify-between mb-5">
          <span
            style={{
              color: project.accent,
              background: project.accentBg,
              border: `1px solid ${project.accentBorder}`,
            }}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full uppercase"
          >
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-600">{project.year}</span>
        </div>

        <h3 className="text-[22px] font-bold text-white mb-3">{project.title}</h3>

        <div
          style={{
            background: `linear-gradient(90deg, ${project.accent}40, transparent)`,
          }}
          className="h-px w-full mb-4"
        />

        <p className="text-slate-500 text-sm mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                color: project.accent,
                background: project.accentBg,
                border: `1px solid ${project.accentBorder}`,
              }}
              className="px-2 py-0.5 rounded text-[11px] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useInView()
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-32 px-6 bg-[#080c14]">
      <div className="max-w-6xl mx-auto">

        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            headerInView ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-white">
            Projects<span className="text-cyan-400">.</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-xl text-sm border text-slate-300"
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}