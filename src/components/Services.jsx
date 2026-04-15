import { useEffect, useRef, useState } from "react"

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

const WebIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="6" width="28" height="20" rx="3" stroke="#22d3ee" strokeWidth="1.5"/>
    <path d="M8 13L12 17L8 21" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 21H22" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MobileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <rect x="8" y="2" width="16" height="28" rx="4" stroke="#818cf8" strokeWidth="1.5"/>
    <circle cx="16" cy="25" r="1.5" fill="#818cf8"/>
    <path d="M12 8H20M12 12H18" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const DesignIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="6" stroke="#2dd4bf" strokeWidth="1.5"/>
    <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 7.5L10.5 10.5M21.5 21.5L24.5 24.5M7.5 24.5L10.5 21.5M21.5 10.5L24.5 7.5" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const AIIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <path d="M4 28L12 16L18 22L24 12L28 16" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="8" r="4" stroke="#a78bfa" strokeWidth="1.5"/>
    <path d="M22 8H26M24 6V10" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// ─── Featured card (Web Dev) ──────────────────────────────────────────────────
function FeaturedCard({ inView }) {
  return (
    <div
      style={{ transitionDelay: "0ms" }}
      className={`col-span-12 lg:col-span-7 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="relative h-full rounded-2xl p-8 overflow-hidden border border-[#1e3a5f] bg-gradient-to-br from-[#0c1a2e] to-[#0f172a] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.12)] hover:border-cyan-500/30 group">
        {/* Glow blob */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan-500/[0.06] pointer-events-none" />

        {/* Featured badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[11px] font-mono tracking-wide mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Most requested
        </div>

        <div className="mb-5 w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
          <WebIcon />
        </div>

        <h3 className="text-2xl font-bold text-slate-100 mb-3">Web Development</h3>
        <p className="text-slate-400 text-[15px] leading-relaxed mb-6">
          Fast, modern, responsive websites and web apps built with React, Vite, and Tailwind CSS.
          From polished landing pages to full-stack platforms that scale.
        </p>

        <div className="flex flex-wrap gap-2">
          {["React", "Node.js", "Tailwind", "Vite", "Full Stack"].map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-cyan-500/[0.07] border border-cyan-500/20 rounded-md text-[11px] text-cyan-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Regular cards ────────────────────────────────────────────────────────────
const cards = [
  {
    num: "02",
    icon: <MobileIcon />,
    iconBg: "bg-indigo-500/10",
    title: "Mobile Apps",
    desc: "Cross-platform apps that feel native on both iOS and Android. Clean interfaces, smooth performance.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    num: "03",
    icon: <DesignIcon />,
    iconBg: "bg-teal-500/10",
    title: "UI/UX Design",
    desc: "Interfaces users love. From wireframes to pixel-perfect designs that convert visitors into customers.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    num: "04",
    icon: <AIIcon />,
    iconBg: "bg-violet-500/10",
    title: "AI Integration",
    desc: "Supercharge your product with AI. Computer vision, chatbots, automation built into real products.",
    tags: ["Python", "OpenCV", "TensorFlow"],
  },
]

function SmallCard({ card, index, inView }) {
  return (
    <div
      style={{ transitionDelay: `${(index + 1) * 100}ms` }}
      className={`col-span-12 sm:col-span-6 lg:col-span-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="relative h-full rounded-2xl p-7 overflow-hidden bg-[#0f172a] border border-[#1e293b] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.07)] hover:border-slate-700 group">
        {/* Faint number watermark */}
        <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] font-mono select-none leading-none">
          {card.num}
        </span>

        <div className={`mb-5 w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
          {card.icon}
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-2">{card.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.desc}</p>

        <div className="flex flex-wrap gap-2">
          {card.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] text-slate-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}


  

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Services() {
  const [headerRef, headerInView] = useInView()
  const [gridRef, gridInView] = useInView()

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden bg-[#080c14]">
      {/* Background blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/[0.05] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/[0.05] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 mb-14 ${headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-cyan-400 font-mono text-[11px] mb-2 tracking-widest uppercase">What I offer</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Services that <span className="text-cyan-400">ship products.</span>
          </h2>
          <p className="text-slate-500 max-w-md leading-relaxed">
            I help startups, businesses, and individuals build digital products that stand out.
            Here is what I can do for you.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="grid grid-cols-12 gap-4">
          {/* Row 1: Featured (7) + Mobile (5) */}
          <FeaturedCard inView={gridInView} />

          <SmallCard card={cards[0]} index={0} inView={gridInView} />

          {/* Row 2: Design (4) + AI (4) + CTA (4 → visually 2 cols on lg) */}
          <div
            style={{ transitionDelay: "200ms" }}
            className={`col-span-12 sm:col-span-6 lg:col-span-4 transition-all duration-700 ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative h-full rounded-2xl p-7 overflow-hidden bg-[#0f172a] border border-[#1e293b] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.07)] hover:border-slate-700 group">
              <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] font-mono select-none leading-none">03</span>
              <div className="mb-5 w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <DesignIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">UI/UX Design</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Interfaces users love. From wireframes to pixel-perfect designs that convert visitors into customers.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "Prototyping", "Design Systems"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] text-slate-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ transitionDelay: "300ms" }}
            className={`col-span-12 sm:col-span-6 lg:col-span-4 transition-all duration-700 ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative h-full rounded-2xl p-7 overflow-hidden bg-[#0f172a] border border-[#1e293b] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.07)] hover:border-slate-700 group">
              <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] font-mono select-none leading-none">04</span>
              <div className="mb-5 w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <AIIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">AI Integration</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Supercharge your product with AI. Computer vision, chatbots, automation built into real products.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "OpenCV", "TensorFlow"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] text-slate-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{ transitionDelay: "300ms" }}
            className={`col-span-12 sm:col-span-6 lg:col-span-4 transition-all duration-700 ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative h-full rounded-2xl p-7 overflow-hidden bg-[#0f172a] border border-[#1e293b] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.07)] hover:border-slate-700 group">
              <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] font-mono select-none leading-none">05</span>
              <div className="mb-5 w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <DesignIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Automation</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Automating repetitive tasks using scripts, APIs, and intelligent workflows to save time and improve efficiency.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "API", "Bots"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[11px] text-slate-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
