"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Pencil, PenToolIcon as Tools, Home, CheckCircle } from "lucide-react"

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  // Add scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [50, 0, 0, -50])

  const steps = [
    {
      icon: <Pencil size={32} />,
      title: "Ontwerp & Overleg",
      content:
        "Samen met de klant verken ik de mogelijkheden om ideeën om te zetten in schetsen en uiteindelijk in een prachtig werkstuk.",
    },
    {
      icon: <Tools size={32} />,
      title: "Productie",
      content:
        "Na goedkeuring begin ik met het ontwerpen en produceren van het project, waarbij de klant duidelijk ziet hoe het eindproduct eruit komt te zien.",
    },
    {
      icon: <Home size={32} />,
      title: "Montage & Plaatsing",
      content:
        "Het project wordt in de werkplaats voorbereid en vervolgens op locatie gemonteerd, als prachtige toevoeging aan de bestaande omgeving.",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Afwerking & Oplevering",
      content:
        "Met een hoogwaardige afwerking volgens de wensen van de klant komen we bij de oplevering. Tevredenheid en garantie staan voorop.",
    },
  ]

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-[#f2b451] text-[#293132] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.h2 style={{ opacity, y }} className="text-4xl font-bold mb-16 text-center">
          <span className="text-[#293132]">Werkwijze</span>
        </motion.h2>

        <motion.div style={{ opacity, y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={index} step={step} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Process flow arrows - only visible on desktop */}
        <div className="hidden lg:block">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{
                left: `calc(25% * ${index + 1} - 1.5rem)`,
                opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0, 1, 1, 0]),
                scale: useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0.5, 1, 1, 0.5]),
              }}
            >
              <div className="text-[#293132] text-4xl">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessCard({ step, index, scrollYProgress }) {
  // Card animation variants based on scroll position
  const delay = index * 0.1

  // Define cardOpacity and cardY here, outside of the return statement
  const cardOpacity = useTransform(scrollYProgress, [0.1 + delay, 0.2 + delay, 0.7 + delay, 0.8 + delay], [0, 1, 1, 0])

  const cardY = useTransform(scrollYProgress, [0.1 + delay, 0.2 + delay, 0.7 + delay, 0.8 + delay], [50, 0, 0, -50])

  const buttonOpacity = useTransform(scrollYProgress, [0.2 + delay, 0.3 + delay], [0, 1])

  return (
    <motion.div
      style={{ opacity: cardOpacity, y: cardY }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-[#293132]/20 shadow-xl h-full flex flex-col"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(45, 49, 52, 0.5)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-[#293132] text-white p-3 rounded-full mr-4 flex-shrink-0">{step.icon}</div>
        <div className="flex flex-col">
          <span className="text-[#293132]/70 text-sm font-semibold">STAP {index + 1}</span>
          <h3 className="text-xl font-bold text-[#293132]">{step.title}</h3>
        </div>
      </div>

      <p className="text-[#293132]/80 leading-relaxed flex-grow">{step.content}</p>

      <motion.div className="mt-6 pt-4 border-t border-[#293132]/20" style={{ opacity: buttonOpacity }}>
        <button className="text-[#293132] hover:text-[#293132]/70 transition-colors duration-300 text-sm font-medium flex items-center">
          Lees meer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}
