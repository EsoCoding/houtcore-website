"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const portfolioItems = [
  {
    id: 1,
    title: "Massieve eiken tafel",
    description:
      "Handgemaakte tafel van duurzaam eikenhout. Ontworpen met aandacht voor detail en duurzaamheid. De natuurlijke uitstraling van het hout komt perfect tot zijn recht in dit tijdloze ontwerp.",
    imageUrl: "/dining-table.jpeg",
  },
  {
    id: 2,
    title: "Inbouwkast met LED-verlichting",
    description:
      "Op maat gemaakte kast met geïntegreerde verlichting. Perfect voor het opbergen van spullen en het creëren van een sfeervolle ambiance in uw woonruimte.",
    imageUrl: "/built-in-cabinet.jpeg",
  },
  {
    id: 3,
    title: "Houten trap",
    description:
      "Minimalistische trap met houten treden. Een prachtige combinatie van functionaliteit en design die elke ruimte opwaardeert.",
    imageUrl: "/wooden-staircase.jpeg",
  },
  {
    id: 4,
    title: "Designlamp",
    description:
      "Unieke hanglamp met industriële uitstraling. Handgemaakt met aandacht voor detail en duurzame materialen.",
    imageUrl: "/pendant-lamp.jpeg",
  },
  {
    id: 5,
    title: "Balustrade",
    description:
      "Strakke witte balustrade met houten details. Een veilige en stijlvolle toevoeging aan uw trap of overloop.",
    imageUrl: "/white-railing.jpeg",
  },
  {
    id: 6,
    title: "Maatwerk meubels",
    description:
      "Meubels op maat voor elke ruimte. Ontworpen en gemaakt volgens uw wensen en perfect passend in uw interieur.",
    imageUrl: "/custom-wooden-furniture.png",
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Section animation based on scroll
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [50, 0, 0, -50])

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-[#293132] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.h2 style={{ opacity, y }} className="text-4xl font-bold mb-16 text-center text-[#f2b451]">
          Portfolio
        </motion.h2>

        {/* New timeline design */}
        <div className="relative max-w-5xl mx-auto">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              item={item}
              index={index}
              isLast={index === portfolioItems.length - 1}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div style={{ opacity, y }} className="mt-20 text-center relative">
          <button className="bg-[#f2b451] text-[#293132] py-3 px-8 rounded-lg hover:bg-[#f2b451]/90 transition-colors duration-300 font-medium">
            Bekijk meer projecten
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function PortfolioItem({ item, index, isLast, scrollProgress }) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: false, amount: 0.2 })
  const isEven = index % 2 === 0
  const delay = index * 0.1

  return (
    <motion.div
      ref={itemRef}
      className={`mb-16 ${isLast ? "mb-0" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{ duration: 0.6, delay: delay * 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center bg-[#f2b451]/10 rounded-lg overflow-hidden border border-[#f2b451]/20">
        {/* Image */}
        <div className={`w-full md:w-2/5 h-64 relative ${isEven ? "md:order-1" : "md:order-2"}`}>
          <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#293132]/80 to-transparent"></div>

          {/* Timeline indicator */}
          <div className="absolute top-0 left-0 h-full w-1 bg-[#f2b451]"></div>

          {/* Number indicator */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#f2b451] flex items-center justify-center text-[#293132] font-bold">
            {index + 1}
          </div>
        </div>

        {/* Content */}
        <div className={`w-full md:w-3/5 p-6 ${isEven ? "md:order-2" : "md:order-1"}`}>
          <h3 className="text-2xl font-bold mb-4 text-[#f2b451]">{item.title}</h3>
          <p className="text-gray-300 mb-6">{item.description}</p>
          <button className="bg-[#f2b451] text-[#293132] py-2 px-6 rounded-md hover:bg-[#f2b451]/90 transition-colors duration-300 font-medium">
            Meer details
          </button>
        </div>
      </div>
    </motion.div>
  )
}
