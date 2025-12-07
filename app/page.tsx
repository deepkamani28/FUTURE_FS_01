import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated gradient blob 1 */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full mix-blend-screen animate-blob-1 blur-3xl" />

        {/* Animated gradient blob 2 */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-pink-600/20 to-cyan-600/20 rounded-full mix-blend-screen animate-blob-2 blur-3xl" />

        {/* Animated gradient blob 3 */}
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen animate-blob-3 blur-3xl" />

        {/* Shimmer overlay grid effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-pink-500/5 animate-shimmer" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
