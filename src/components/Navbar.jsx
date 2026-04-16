import { useState, useEffect } from "react"

const links = ["About", "Services", "Projects", "Contact"]

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
       
    </nav>
  )
}
