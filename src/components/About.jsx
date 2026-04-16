import { useEffect, useRef, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
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
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold text-cyan-400 mb-2">
        {count}+
      </div>
      <div className="text-gray-500 text-sm font-mono tracking-wide">
        {label}
      </div>
    </div>
  )
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
   <section id="about" className="py-52 px-6 max-w-6xl mx-auto">

      {/* Header */}
      <FadeIn>
        <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">
          Who I am
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">
          About Me
        </h2>
      </FadeIn>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-24">

        {/* Left Text */}
        <FadeIn delay={100}>
          <div className="space-y-5 text-gray-400 text-lg leading-relaxed max-w-xl">

            <p>
              I’m a Computer Engineering undergraduate at the University of
              Peradeniya, Sri Lanka, passionate about building intelligent
              systems that solve real-world problems.
            </p>

            <p>
              My interests lie in AI, Computer Vision, and modern web
              technologies, turning ideas into impactful products.
            </p>

            <p>
              From Arduino-based robotics to full-stack AI applications, I enjoy
              creating solutions that make a difference.
            </p>

          </div>
        </FadeIn>

        {/* Right Card */}
        <FadeIn delay={200}>
          <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg space-y-4 w-full max-w-lg transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/10">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">University</span>
              <span className="text-white">University of Peradeniya</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Degree</span>
              <span className="text-white">Computer Engineering</span>
            </div>

            

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Location</span>
              <span className="text-white">Sri Lanka</span>
            </div>

            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Open to opportunities
            </div>

          </div>
        </FadeIn>

      </div>

      {/* Stats */}
      <FadeIn delay={300}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-16 mt-10 border-t border-gray-800">

          <FadeIn delay={400}>
            <Counter target={10} label="Projects Built" />
          </FadeIn>

          <FadeIn delay={500}>
            <Counter target={10} label="Technologies" />
          </FadeIn>

          <FadeIn delay={600}>
            <Counter target={2} label="Years" />
          </FadeIn>

          <FadeIn delay={700}>
              <Counter target={30} label="Features" />
          </FadeIn>

        </div>
      </FadeIn>

    </section>
  )
}