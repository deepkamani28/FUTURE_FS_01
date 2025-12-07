"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, Mail, Linkedin, Github, Twitter } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

      // Check if access key exists
      if (!accessKey) {
        console.error("Web3Forms access key is missing!")
        throw new Error("Email configuration error. Please contact the site administrator.")
      }

      // Send to your API route (for database storage)
      const dbResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const dbData = await dbResponse.json()

      if (!dbResponse.ok) {
        throw new Error(dbData.message || "Failed to send message")
      }
      const web3formsPayload = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `New Contact Form Message from ${formData.name}`,
      }

      console.log("Sending to Web3Forms with payload:", { ...web3formsPayload, access_key: "***" })

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(web3formsPayload),
      })

      const emailData = await emailResponse.json()
      console.log("Web3Forms response:", emailData)

      if (!emailData.success) {
        console.error("Web3Forms error:", emailData.message)
      } else {
        console.log("Email sent successfully!")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-4 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-sm font-semibold gradient-text mb-3 uppercase tracking-widest">Get In Touch</p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Let's Create Together</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate to bring your vision to life with cutting-edge technology and
            creative excellence.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="p-8 bg-gradient-to-br from-card/50 to-card/20 rounded-2xl border border-accent/20 shadow-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-background/50 border border-accent/20 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50 placeholder-muted-foreground backdrop-blur-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-background/50 border border-accent/20 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50 placeholder-muted-foreground backdrop-blur-sm"
                  placeholder="E-mail"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-accent/20 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none disabled:opacity-50 placeholder-muted-foreground backdrop-blur-sm"
                  placeholder="Write a message"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent to-secondary text-background rounded-xl hover:shadow-lg hover:shadow-accent/50 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg group"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {submitted && (
                <div className="p-4 bg-accent/10 text-accent border border-accent/30 rounded-xl text-sm font-medium">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl text-sm font-medium">
                  ✗ {error}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Connect With Me</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a project, want to collaborate, or just want to say hello, feel free to reach out. I'm
                always excited to connect.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:deepkamani28@gmail.com"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-card/50 to-card/20 border border-accent/20 rounded-xl hover:border-accent/50 hover:shadow-lg transition-all group backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-accent/50 group-hover:to-secondary/20 transition-all">
                  <Mail className="text-accent" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">deepkamani28@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/deep-kamani-433493330/"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-card/50 to-card/20 border border-accent/20 rounded-xl hover:border-accent/50 hover:shadow-lg transition-all group backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-accent/50 group-hover:to-secondary/20 transition-all">
                  <Linkedin className="text-accent" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">linkedin.com/in/deep-kamani-433493330/</div>
                </div>
              </a>

              <a
                href="https://github.com/deepkamani28"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-card/50 to-card/20 border border-accent/20 rounded-xl hover:border-accent/50 hover:shadow-lg transition-all group backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-accent/50 group-hover:to-secondary/20 transition-all">
                  <Github className="text-accent" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">GitHub</div>
                  <div className="text-sm text-muted-foreground">github.com/deepkamani28</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
