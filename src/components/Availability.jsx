import { useEffect, useRef, useState } from "react"
import Globe from "./Globe"

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

export default function Availability() {
  const [ref, inView] = useInView()
  return (
    <section className="py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">Available worldwide</p>
            <h2 className="text-4xl font-bold text-white mb-6">Remote Ready. Global Reach.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Based in Sri Lanka, I work with clients from anywhere in the world. Whether you are a startup in London, a business in Dubai, or a founder in Silicon Valley — I am ready to build with you.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { label: "Response time", value: "Within 24 hours" },
                { label: "Availability", value: "Full time freelance" },
                { label: "Timezone", value: "GMT+5:30 (flexible)" },
                { label: "Languages", value: "English, Sinhala" },
              ].map(item => (
                <div key={item.label} className="flex justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-500 font-mono text-sm">{item.label}</span>
                  <span className="text-cyan-300 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-sm">Available for new projects</span>
            </div>
          </div>

          <div className="h-80 md:h-96 relative">
            <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-3xl" />
            <Globe />
          </div>
        </div>
      </div>
    </section>
  )
}
