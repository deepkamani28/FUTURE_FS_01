"use client"

import Link from "next/link"
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background to-card/50 border-t border-accent/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              href="#hero"
              className="text-3xl font-bold gradient-text mb-4 inline-block hover:scale-110 transition-transform"
            >
              <img src="favicon.ico" alt="DK" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building beautiful, performant digital experiences with modern technologies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-accent transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/Deep_Kamani_Resume.pdf" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/deep-kamani-433493330/" className="text-muted-foreground hover:text-accent transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://github.com/deepkamani28" className="text-muted-foreground hover:text-accent transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/deepkamani28"
                className="p-3 bg-gradient-to-br from-accent/30 to-secondary/10 hover:from-accent/50 hover:to-secondary/20 rounded-lg transition-all shadow-md hover:shadow-lg group"
                aria-label="GitHub"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/deep-kamani-433493330/"
                className="p-3 bg-gradient-to-br from-accent/30 to-secondary/10 hover:from-accent/50 hover:to-secondary/20 rounded-lg transition-all shadow-md hover:shadow-lg group"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p></p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold gradient-text hover:bg-accent/10 rounded-lg transition-all border border-accent/20 hover:border-accent/50 group"
              aria-label="Scroll to top"
            >
              Back to Top
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
