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
    description: "A computer vision app that detects and interprets hand gestures in real time using MediaPipe and OpenCV.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    github: "https://github.com/",
    color: "from-cyan-500 to-blue-500",
    border: "hover:border-cyan-500/50",
    glow: "hover:shadow-cyan-500/10",
  },
  {
    title: "UniPartner",
    description: "An AI powered web app that helps university students find project partners based on skills and interests.",
    tags: ["React", "Node.js", "AI", "Web App"],
    github: "https://github.com/",
    color: "from-blue-500 to-indigo-500",
    border: "hover:border-blue-500/50",
    glow: "hover:shadow-blue-500/10",
  },
  {
    title: "GoTravel",
    description: "A modern travel web app that lets users discover destinations, plan trips, and share travel experiences.",
    tags: ["React", "Tailwind CSS", "Web App"],
    github: "https://github.com/",
    color: "from-teal-500 to-cyan-500",
    border: "hover:border-teal-500/50",
    glow: "hover:shadow-teal-500/10",
  },
  {
    title: "Line Following Robot",
    description: "An Arduino based autonomous robot that follows a line track using IR sensors and motor control logic.",
    tags: ["Arduino", "C++", "Embedded", "Robotics"],
    github: "https://github.com/",
    color: "from-indigo-500 to-blue-500",
    border: "hover:border-indigo-500/50",
    glow: "hover:shadow-indigo-500/10",
  },
  {
    title: "BizPilot AI",
    description: "An AI powered business assistant for small and medium enterprises to automate tasks and gain insights.",
    tags: ["Python", "AI", "React", "SME Tools"],
    github: "https://github.com/",
    color: "from-blue-500 to-cyan-400",
    border: "hover:border-cyan-400/50",
    glow: "hover:shadow-cyan-400/10",
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [ref, inView] = useInView()

  const handleMouseMove = e => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`bg-gray-900/80 border border-gray-800 ${project.border} ${project.glow} rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-2xl cursor-default h-full`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className={`w-full h-1 rounded-full bg-gradient-to-r ${project.color} mb-6`} />
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-950/60 text-blue-300 border border-blue-800/50 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-mono">
          View on GitHub ?
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()
  return (
    <section id="projects" className="py-40 px-6 max-w-6xl mx-auto">
      <div
        ref={ref}
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">What I have built</p>
        <h2 className="text-4xl font-bold text-white mb-12">Projects</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
