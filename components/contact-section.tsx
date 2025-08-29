"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Add scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [50, 0, 0, -50])

  // Different animations for left and right content
  // Modified to prevent movement at the end (0.9 value is now 0 instead of -100/100)
  const leftX = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [-100, 0, 0, 0])
  const rightX = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [100, 0, 0, 0])

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-[#f2b451] text-[#293132]">
      <div className="container mx-auto px-4">
        <motion.h2 style={{ opacity, y }} className="text-4xl font-bold mb-12 text-center">
          Contact
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div style={{ opacity, x: leftX }} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Neem contact op</h3>
              <p className="mb-6">Heeft u een vraag of wilt u een project bespreken? Neem gerust contact met mij op.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#293132] text-white p-3 rounded-full">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>info@houtcore.nl</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#293132] text-white p-3 rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Telefoon</h4>
                <p>+31 6 12345678</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#293132] text-white p-3 rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Locatie</h4>
                <p>Werkplaats in Nederland</p>
              </div>
            </div>
          </motion.div>

          <motion.form style={{ opacity, x: rightX }} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Naam
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-[#293132]/20 focus:outline-none focus:ring-2 focus:ring-[#293132]"
                placeholder="Uw naam"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-[#293132]/20 focus:outline-none focus:ring-2 focus:ring-[#293132]"
                placeholder="Uw emailadres"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Bericht
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-[#293132]/20 focus:outline-none focus:ring-2 focus:ring-[#293132]"
                placeholder="Uw bericht"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#293132] text-white py-3 px-6 rounded-lg hover:bg-[#293132]/90 transition-colors duration-300 w-full md:w-auto"
            >
              Versturen
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
