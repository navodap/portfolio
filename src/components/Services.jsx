import { useEffect, useRef, useState } from "react"

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

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" rx="3" stroke="#22d3ee" strokeWidth="1.5"/>
        <path d="M8 13L12 17L8 21" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 21H22" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Web Development",
    desc: "Fast, modern, responsive websites and web apps built with React, Vite, and Tailwind CSS. From landing pages to full stack platforms.",
    tags: ["React", "Node.js", "Tailwind", "Vite"],
    color: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-cyan-500/50",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="2" width="16" height="28" rx="4" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="16" cy="25" r="1.5" fill="#22d3ee"/>
        <path d="M12 8H20M12 12H18" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Mobile Apps",
    desc: "Cross-platform mobile applications that work beautifully on both iOS and Android. Clean interfaces, smooth performance.",
    tags: ["React Native", "iOS", "Android", "Cross-platform"],
    color: "from-indigo-500/20 to-blue-500/20",
    border: "hover:border-blue-500/50",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" stroke="#22d3ee" strokeWidth="1.5"/>
        <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.5 7.5L10.5 10.5M21.5 21.5L24.5 24.5M7.5 24.5L10.5 21.5M21.5 10.5L24.5 7.5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces that users love. From wireframes to pixel-perfect designs that convert visitors into customers.",
    tags: ["Figma", "Prototyping", "Design Systems", "Research"],
    color: "from-cyan-500/20 to-teal-500/20",
    border: "hover:border-teal-500/50",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 28L12 16L18 22L24 12L28 16" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="8" r="4" stroke="#22d3ee" strokeWidth="1.5"/>
        <path d="M22 8H26M24 6V10" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI Integration",
    desc: "Supercharge your product with AI. Computer vision, chatbots, automation — I integrate cutting-edge AI into real products.",
    tags: ["Python", "OpenCV", "TensorFlow", "APIs"],
    color: "from-blue-600/20 to-indigo-500/20",
    border: "hover:border-indigo-500/50",
  },
]

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative bg-gray-900/80 border border-gray-800 ${service.border} rounded-2xl p-7 h-full transition-all duration-300 overflow-hidden group cursor-default`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className="relative z-10">
          <div className="mb-5">{service.icon}</div>
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.desc}</p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-950/60 text-blue-300 border border-blue-800/30 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const [ref, inView] = useInView()
  return (
    <section id="services" className="py-40 px-6 bg-blue-950/10">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">What I offer</p>
          <h2 className="text-4xl font-bold text-white mb-4">Services</h2>
          <p className="text-gray-400 mb-16 max-w-xl">I help startups, businesses, and individuals build digital products that stand out. Here is what I can do for you.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
