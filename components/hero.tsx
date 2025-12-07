"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/30 to-secondary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div
          className={`space-y-8 order-2 md:order-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div>
            <p className="text-sm font-semibold gradient-text mb-2 uppercase tracking-widest">
              Welcome to my digital space
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">Deep Kamani</h1>
            <p className="text-xl text-accent font-semibold mb-3">Full Stack Web Developer</p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              I enjoy building modern web applications using MongoDB, Express, React and Node.js. My focus is writing clean code, improving performance and creating products that feel simple and intuitive for users.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-background rounded-xl hover:shadow-lg hover:shadow-accent/50 transition-all shadow-lg font-bold group"
            >
              Get in Touch
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/Deep_Kamani_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent hover:bg-accent/5 transition-all font-bold backdrop-blur-sm"
            >
              Download Resume
            </a>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/deepkamani28"
              className="p-4 bg-gradient-to-br from-accent/20 to-secondary/10 hover:from-accent/30 hover:to-secondary/20 rounded-xl transition-all shadow-lg hover:shadow-xl border border-accent/30 backdrop-blur-sm group"
              aria-label="GitHub"
            >
              <Github size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/deep-kamani-433493330/"
              className="p-4 bg-gradient-to-br from-accent/20 to-secondary/10 hover:from-accent/30 hover:to-secondary/20 rounded-xl transition-all shadow-lg hover:shadow-xl border border-accent/30 backdrop-blur-sm group"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:deepkamani28@gmail.com"
              className="p-4 bg-gradient-to-br from-accent/20 to-secondary/10 hover:from-accent/30 hover:to-secondary/20 rounded-xl transition-all shadow-lg hover:shadow-xl border border-accent/30 backdrop-blur-sm group"
              aria-label="Email"
            >
              <Mail size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div
          className={`flex justify-center md:justify-start order-1 md:order-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div className="relative w-72 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-secondary/20 to-transparent rounded-3xl blur-3xl animate-glow" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/10 rounded-3xl" />
            <img
              src="/photo.jpeg"
              alt="Deep Kamani"
              className="relative w-full h-full rounded-3xl object-cover shadow-2xl border border-accent/30 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
