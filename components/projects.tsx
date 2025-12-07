"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Projects() {
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

  const projects = [
    {
      title: "She Secure ",
      description: "App triggere usig voice command and shares real-time location sharing (via GPS), emergency message triggering and a mobile-friendly interface designed for fast and easy access during critical situations.",
      tech: ["Java", "SQLite", "XML", "Android Studio"],
      image: "/project_photo.webp",
    }
  ]

  return (
    <section id="projects" className="py-32 px-4 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm font-semibold gradient-text mb-3 uppercase tracking-widest">Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`group bg-gradient-to-br from-card/50 to-card/20 rounded-2xl overflow-hidden border border-accent/20 shadow-lg hover:shadow-2xl hover:border-accent/50 transition-all backdrop-blur-sm transform hover:scale-105 duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-accent/20 to-secondary/10">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-accent/20 to-secondary/10 text-accent text-xs rounded-full font-medium border border-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link
                    href="https://github.com/deepkamani28/She-Secure" target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-foreground/5 text-foreground hover:bg-accent/20 hover:text-accent rounded-lg transition-all font-medium text-sm border border-foreground/10 hover:border-accent/50"
                  >
                    <Github size={16} />
                    Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
