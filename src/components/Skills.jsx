import { useEffect, useRef, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const skills = [
  { name: "Python", level: 90, color: "from-blue-500 to-cyan-400" },
  { name: "React & JavaScript", level: 85, color: "from-cyan-500 to-blue-400" },
  { name: "Computer Vision", level: 80, color: "from-blue-600 to-indigo-400" },
  { name: "C / C++", level: 75, color: "from-indigo-500 to-blue-400" },
  { name: "TensorFlow / AI", level: 70, color: "from-cyan-600 to-teal-400" },
  { name: "Arduino / Embedded", level: 75, color: "from-blue-500 to-cyan-300" },
  { name: "Tailwind CSS", level: 88, color: "from-cyan-400 to-blue-500" },
  { name: "Git & GitHub", level: 82, color: "from-indigo-400 to-cyan-400" },
]

const badges = ["OpenCV", "MediaPipe", "NumPy", "Pandas", "Node.js", "Vite", "Figma", "VS Code", "Java", "HTML", "CSS"]

function SkillBar({ name, level, color, index }) {
  const [width, setWidth] = useState(0)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (!inView) return
    setTimeout(() => setWidth(level), index * 100)
  }, [inView, level, index])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-sm font-medium">{name}</span>
        <span className="text-cyan-400 text-sm font-mono">{width}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()
  return (
    <section id="skills" className="py-40 px-6 bg-blue-950/10">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">What I work with</p>
          <h2 className="text-4xl font-bold text-white mb-16">Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} index={i} />
          ))}
        </div>
        <div className="mt-16">
          <p className="text-gray-500 text-sm font-mono mb-4 uppercase tracking-widest">Also familiar with</p>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, i) => (
              <span
                key={badge}
                className="px-4 py-2 bg-blue-950/50 border border-blue-800/50 text-blue-300 rounded-full text-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
