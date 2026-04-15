export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-2xl font-bold">
            <span className="text-shimmer">Navoda Perera.</span>
          </div>
          <div className="flex gap-8">
            {["About", "Services", "Skills", "Projects", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-cyan-400 transition-colors text-sm font-mono">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for work
          </div>
        </div>
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-mono">
            � 2026 Navoda Perera. Built with React + Vite + Tailwind CSS
          </p>
          <p className="text-gray-600 text-sm font-mono">
            Designed & Developed by <span className="text-cyan-400">Navoda Perera</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
