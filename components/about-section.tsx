"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Set once: false to ensure the animation happens every time the section enters/exits the viewport
  // Set amount: 0.3 to trigger when 30% of the section is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#293132] text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image on the left with fade animation */}
          <motion.div
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <Image src="/woodworking-workshop.png" alt="Houtcore workshop" fill className="object-cover" />
          </motion.div>

          {/* Text content on the right with fade animation */}
          <motion.div animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-8 text-center md:text-left text-[#B89960]">Over Houtcore</h2>

            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              Van jongs af aan had ik al een voorliefde om dingen te maken, te creëren, te bouwen. Aan deze passie is
              een duidelijke richting gegeven toen ik in 2008 besloot een meubelmakeropleiding te volgen. Na de Proeve
              van Bekwaamheid kwam het zoeken naar een eigen stijl en werkwijze. In de loop der jaren heb ik deze verder
              ontwikkeld, mede door de ervaringen die ik in de praktijk heb opgedaan.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              2023 besloot ik uiteindelijk voor mezelf te beginnen, en zo werd Houtcore geboren! Met aandacht voor
              individuele smaak en oog voor de wensen van mijn klanten realiseer ik vakkundig unieke meubels, interieur,
              maatwerk en projecten. Hierbij wordt ook gekeken naar praktische oplossingen zodat het meeste uit elk
              project gehaald kan worden. Met het motto "mooie dingen maken" en een tevreden klant als prioriteit geef
              ik vorm aan uw dromen...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
