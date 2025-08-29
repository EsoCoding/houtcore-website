"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Pencil, Torus as Tools, Home, CheckCircle } from "lucide-react"

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  const steps = [
    {
      icon: <Pencil size={32} />,
      title: "Ontwerp & Overleg",
      content:
        "Samen met de klant verken ik de mogelijkheden om ideeën om te zetten in schetsen en uiteindelijk in een prachtig werkstuk.",
      color: "bg-[#f2b451]",
    },
    {
      icon: <Tools size={32} />,
      title: "Productie",
      content:
        "Na goedkeuring begin ik met het ontwerpen en produceren van het project, waarbij de klant duidelijk ziet hoe het eindproduct eruit komt te zien.",
      color: "bg-[#B89960]",
    },
    {
      icon: <Home size={32} />,
      title: "Montage & Plaatsing",
      content:
        "Het project wordt in de werkplaats voorbereid en vervolgens op locatie gemonteerd, als prachtige toevoeging aan de bestaande omgeving.",
      color: "bg-[#2d3134]",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Afwerking & Oplevering",
      content:
        "Met een hoogwaardige afwerking volgens de wensen van de klant komen we bij de oplevering. Tevredenheid en garantie staan voorop.",
      color: "bg-[#f2b451]",
    },
  ]

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-[#f2b451] text-[#2d3134] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-[#2d3134]">Onze Werkwijze</h2>
          <p className="text-xl text-[#2d3134]/80 max-w-2xl mx-auto">
            Van eerste schets tot eindproduct, elke stap wordt met zorg uitgevoerd
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <ProcessCard key={index} step={step} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Process flow - desktop only */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#2d3134]/20 transform -translate-y-1/2"></div>
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-1 bg-[#2d3134] transform -translate-y-1/2"
          ></motion.div>
        </div>
      </div>
    </section>
  )
}

function ProcessCard({ step, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Card */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-[#2d3134]/10 shadow-xl h-full flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Step number */}
        <div className="absolute -top-4 left-8 bg-[#2d3134] text-white text-sm font-bold px-3 py-1 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Icon */}
        <div className="flex items-center mb-6">
          <div
            className={`${step.color} text-white p-4 rounded-xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
          >
            {step.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2d3134] group-hover:text-[#2d3134]/80 transition-colors duration-300">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <p className="text-[#2d3134]/80 leading-relaxed flex-grow mb-6">{step.content}</p>

        {/* CTA */}
        <button className="text-[#2d3134] hover:text-[#2d3134]/70 transition-colors duration-300 text-sm font-medium flex items-center self-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Meer informatie
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
