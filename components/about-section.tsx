"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#2d3134] text-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Reduced header spacing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="inline-block">
              <h2 className="text-5xl md:text-6xl font-light mb-4 text-[#B89960] tracking-tight">
                Over <span className="font-bold">Houtcore</span>
              </h2>
              <div className="w-24 h-1 bg-[#f2b451] mx-auto"></div>
            </div>
          </motion.div>

          {/* Reduced spacing between sections */}
          <div className="grid grid-cols-12 gap-8 items-center mb-20">
            {/* Large image taking more space */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="relative">
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/woodworking-workshop.png" alt="Mijn werkplaats" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating element */}
              </div>
            </motion.div>

            {/* Content with reduced padding */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="col-span-12 lg:col-span-5"
            >
              <div className="lg:pl-8">
                <h3 className="text-2xl font-light mb-6 text-[#f2b451]">De man achter het ambacht</h3>

                <div className="space-y-5 text-lg leading-relaxed text-gray-300 font-light">
                  <p>
                    Van jongs af aan had ik een voorliefde voor het maken van dingen. In 2008 gaf ik daar richting aan
                    met een meubelmakeropleiding.
                  </p>

                  <p>
                    Na jaren van ervaring opdoen en het ontwikkelen van mijn eigen stijl, besloot ik in 2023 de stap te
                    wagen: Houtcore was geboren.
                  </p>

                  <p>
                    Elk project begint met luisteren naar jouw verhaal. Want elk stuk dat ik maak, moet perfect passen
                    bij jouw leven.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#B89960]/30 mt-7">
                  <motion.a
                    href="/story"
                    className="inline-flex items-center space-x-3 text-[#f2b451] font-medium text-lg hover:text-[#B89960] transition-colors duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Lees mijn volledige verhaal</span>
                    <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reduced stats section padding */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-[#f2b451]/5 via-[#B89960]/5 to-[#f2b451]/5 rounded-3xl p-12 border border-[#B89960]/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="group">
                  <div className="text-5xl font-light text-[#f2b451] mb-3 group-hover:scale-110 transition-transform duration-300">
                    15+
                  </div>
                  <div className="text-lg text-gray-300 font-light uppercase tracking-wider">Jaar Ervaring</div>
                </div>

                <div className="group">
                  <div className="text-5xl font-light text-[#B89960] mb-3 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-lg text-gray-300 font-light uppercase tracking-wider">Maatwerk</div>
                </div>

                <div className="group">
                  <div className="text-5xl font-light text-[#f2b451] mb-3 group-hover:scale-110 transition-transform duration-300">
                    ∞
                  </div>
                  <div className="text-lg text-gray-300 font-light uppercase tracking-wider">Mogelijkheden</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
