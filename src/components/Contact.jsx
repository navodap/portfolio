import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [focused, setFocused] = useState("")

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    emailjs.send(
      "service_e3thlxk",
      "template_g8rtcen",
      { from_name: form.name, from_email: form.email, message: form.message },
      "3fqA2IwbzIP82CRtO"
    )
    .then(() => { setSent(true); setLoading(false) })
    .catch(() => { setError("Something went wrong. Please try again."); setLoading(false) })
  }

  return (
    <section id="contact" className="py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">Get in touch</p>
            <h2 className="text-4xl font-bold text-white mb-6">Let us Build Something Amazing</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Have a project in mind? Looking for a developer to join your team? Or just want to say hi? My inbox is always open.
            </p>

            <div className="space-y-6">
              {[
                { icon: "??", label: "Email", value: "your@email.com" },
                { icon: "??", label: "Location", value: "Sri Lanka (Remote)" },
                { icon: "?", label: "Response time", value: "Within 24 hours" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4 hover-lift group">
                  <div className="w-12 h-12 bg-gray-900 border border-gray-800 group-hover:border-cyan-800 rounded-xl flex items-center justify-center text-xl transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-mono">{item.label}</p>
                    <p className="text-gray-200 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <a href="https://github.com/" target="_blank" rel="noreferrer"
                className="w-10 h-10 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-200 hover-lift">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer"
                className="w-10 h-10 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-200 hover-lift">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center animate-scaleIn">
                <div className="text-5xl mb-4">??</div>
                <p className="text-green-400 text-xl font-semibold mb-2">Message sent!</p>
                <p className="text-gray-400">Thanks for reaching out. I will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-5 hover-glow">
                {[
                  { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-gray-400 text-sm mb-2 font-mono">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused("")}
                      required
                      className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${focused === field.name ? "border-cyan-500 shadow-lg shadow-cyan-500/10" : "border-gray-800"}`}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-mono">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                    rows={5}
                    className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none ${focused === "message" ? "border-cyan-500 shadow-lg shadow-cyan-500/10" : "border-gray-800"}`}
                    placeholder="Tell me about your project..."
                  />
                </div>
                {error && <p className="text-red-400 text-sm font-mono">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 animate-gradientShift"
                >
                  {loading ? "Sending..." : "Send Message ?"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
