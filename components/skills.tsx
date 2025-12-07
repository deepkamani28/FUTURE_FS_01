"use client"

import { useEffect, useRef, useState } from "react"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const skillGroups = [
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
      gradient: "from-accent",
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Middleware"],
      gradient: "from-secondary",
    },
    {
      title: "Database",
      skills: ["SQL", "MongoDB"],
      gradient: "from-accent",
    },
    {
      title: "Tools & DevOps",
      skills: ["Git & GitHub", "Netlify", "Vercel", "VS Code"],
      gradient: "from-secondary",
    },
  ]

  return (
    <section id="skills" className="py-32 px-4 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm font-semibold gradient-text mb-3 uppercase tracking-widest">Skills</p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">Technologies & Expertise</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className={`group p-8 bg-gradient-to-br from-card/50 to-card/20 rounded-2xl border border-foreground/10 shadow-lg hover:shadow-xl hover:border-accent/50 transition-all backdrop-blur-sm duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3
                className={`text-2xl font-bold bg-gradient-to-r ${group.gradient} to-secondary bg-clip-text text-transparent mb-6`}
              >
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-accent/20 to-secondary/10 text-foreground rounded-full text-sm font-medium border border-accent/30 hover:border-accent/60 hover:shadow-md transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
