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

function Counter({ target, label }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 40)
    const interval = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(interval) }
      else setCount(start)
    }, 40)
    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-cyan-400 mb-1">{count}+</div>
      <div className="text-gray-500 text-sm font-mono">{label}</div>
    </div>
  )
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-40 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">Who I am</p>
        <h2 className="text-4xl font-bold text-white mb-12">About Me</h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <FadeIn delay={100}>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I am Navoda Perera, a Semester 3 Computer Engineering student at University of Peradeniya, Sri Lanka. I am passionate about building intelligent systems that solve real world problems.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I love working with AI, Computer Vision, and modern web technologies. I enjoy turning ideas into working products — from Arduino robots to full stack AI web apps.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            When I am not coding, I am exploring new tech, contributing to projects, and leveling up my engineering skills one line of code at a time.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-gray-900/80 border border-blue-900/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500 font-mono text-sm">University</span>
                <span className="text-gray-200 text-sm">Uni. of Peradeniya</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500 font-mono text-sm">Degree</span>
                <span className="text-gray-200 text-sm">Computer Engineering</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500 font-mono text-sm">Semester</span>
                <span className="text-gray-200 text-sm">Semester 3</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500 font-mono text-sm">Location</span>
                <span className="text-gray-200 text-sm">Sri Lanka</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-mono text-sm">Status</span>
                <span className="text-cyan-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block animate-pulse" />
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={300}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-800">
          <Counter target={5} label="Projects Built" />
          <Counter target={8} label="Technologies" />
          <Counter target={3} label="Semesters Done" />
          <Counter target={100} label="Commits" />
        </div>
      </FadeIn>
    </section>
  )
}
