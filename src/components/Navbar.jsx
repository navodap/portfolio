import { useState, useEffect } from "react"

const links = ["About", "Services", "Skills", "Projects", "Contact"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-gray-950/80 backdrop-blur-md border-b border-blue-900/50" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold tracking-tight">
          <span className="text-cyan-400">N</span><span className="text-blue-400">avoda</span><span className="text-cyan-400">.</span>
        </a>
        <ul className="hidden md:flex gap-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium font-mono">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden md:block px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200">
          Hire Me
        </a>
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 border-t border-blue-900/50 px-6 py-4">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block py-2 text-gray-400 hover:text-cyan-400 transition-colors font-mono" onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <a href="#contact" className="block mt-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium text-center">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
