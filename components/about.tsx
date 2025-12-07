"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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

  const stats = [
    { value: "1+", label: "Years of Learning" },
    { value: "1", label: "Projects Delivered" },
    { value: "10+", label: "Technologies" },
  ]

  return (
    <section id="about" className="py-32 px-4 lg:px-8 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm font-semibold gradient-text mb-3 uppercase tracking-widest">About Me</p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">Crafting Digital Experiences</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`group p-8 bg-gradient-to-br from-card/50 to-card/20 rounded-2xl border border-accent/20 shadow-lg hover:shadow-xl hover:border-accent/50 transition-all backdrop-blur-sm transform hover:scale-105 duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-6xl font-bold gradient-text mb-3">{stat.value}</div>
              <h3 className="text-lg font-semibold text-foreground">{stat.label}</h3>
            </div>
          ))}
        </div>

        <div
          className={`bg-gradient-to-br from-accent/10 to-secondary/5 rounded-2xl p-10 border border-accent/20 backdrop-blur-sm transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            I'm a beginner developer building my skills one project at a time. I enjoy working with modern web technologies and love the feeling of turning an idea into something real and interactive on the screen.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground mb-6">
            Right now, I'm exploring React, Next.js and full-stack concepts. I focus on writing clear, reusable code and building things that are simple, responsive and user-friendly.
          </p>
        </div>
      </div>
    </section>
  )
}
