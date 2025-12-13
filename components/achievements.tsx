"use client"

import { useEffect, useRef, useState } from "react"
import CertificateModal from "./certificate-modal"

interface Achievement {
  year: string
  title: string
  description: string
  type: string
  certificateUrl: string
}

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const achievements : Achievement[] = [
    {
      year: "2025",
      title: "NPTEL Online Certification",
      description: "Introduction to Internet of Things",
      type: "Certification",
      certificateUrl:"/IoT.pdf",
    },
    {
      year: "2024",
      title: "NPTEL Online Certification",
      description: "Computer Networks And Internet Protocol",
      type: "Certification",
      certificateUrl:"/CN.pdf",
    },
    {
      year: "2023",
      title: "Infosys Springboard Course",
      description: "Database and SQL",
      type: "Certification",
      certificateUrl:"/DBMS.pdf",
    }
  ]

  return (
  <>
    <section id="achievements" className="py-32 px-4 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm font-semibold gradient-text mb-3 uppercase tracking-widest">Timeline</p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">Achievements & Milestones</h2>
        </div>

        <div className="space-y-6">
          {achievements.map((achievement, idx) => (
            <a
              key={idx}
              href={achievement.certificateUrl}
              target="_blank"
              className={`cursor-pointer flex gap-6 md:gap-8 p-6 rounded-2xl bg-gradient-to-r from-card/50 to-card/20 border border-accent/20 shadow-lg hover:shadow-xl hover:border-accent/40 transition-all backdrop-blur-sm group hover:translate-x-2 duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >

              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center font-bold text-background shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                  ✓
                </div>
                {idx < achievements.length - 1 && (
                  <div className="w-1 h-20 bg-gradient-to-b from-accent to-secondary mt-4 opacity-50" />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-4 items-start md:items-center flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="text-sm font-bold gradient-text mb-2">{achievement.year}</p>
                    <h3 className="text-lg font-bold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <span className="px-4 py-1 bg-gradient-to-r from-accent/20 to-secondary/10 text-accent text-xs rounded-full font-semibold whitespace-nowrap border border-accent/30">
                    {achievement.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
    <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        achievement={selectedAchievement}
      />
    </>
  )
}
