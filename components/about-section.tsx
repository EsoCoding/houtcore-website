"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  // Mobile-specific animation durations
  const mobileAnimationDuration = 0.8
  const desktopAnimationDuration = 0.5

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-houtcore-charcoal text-white relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: window.innerWidth < 768 ? mobileAnimationDuration : desktopAnimationDuration,
              ease: "easeOut",
            }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 text-houtcore-brown tracking-tight">
                Over <span className="font-bold">Houtcore</span>
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-houtcore-gold mx-auto"></div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12 lg:mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{
                duration: window.innerWidth < 768 ? mobileAnimationDuration + 0.2 : desktopAnimationDuration + 0.1,
                ease: "easeOut",
                delay: window.innerWidth < 768 ? 0.2 : 0.1,
              }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[450px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/woodworking-workshop.png" alt="Mijn werkplaats" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{
                duration: window.innerWidth < 768 ? mobileAnimationDuration + 0.2 : desktopAnimationDuration + 0.1,
                ease: "easeOut",
                delay: window.innerWidth < 768 ? 0.4 : 0.2,
              }}
              className="lg:col-span-5"
            >
              <div className="lg:pl-6 xl:pl-8">
                <h3 className="text-xl sm:text-2xl font-light mb-4 lg:mb-6 text-houtcore-gold">
                  De man achter het ambacht
                </h3>

                <div className="space-y-4 lg:space-y-5 text-base sm:text-lg leading-relaxed text-gray-300 font-light">
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

                <div className="pt-4 lg:pt-6 border-t border-houtcore-brown/30 mt-5 lg:mt-7">
                  <motion.a
                    href="/story"
                    className="inline-flex items-center space-x-2 lg:space-x-3 text-houtcore-gold font-medium text-base lg:text-lg hover:text-houtcore-brown transition-colors duration-400 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Lees mijn volledige verhaal</span>
                    <motion.div className="group-hover:translate-x-1 transition-transform duration-400">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: window.innerWidth < 768 ? 0.6 : 0.3,
              duration: window.innerWidth < 768 ? mobileAnimationDuration : desktopAnimationDuration,
              ease: "easeOut",
            }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-houtcore-gold/5 via-houtcore-brown/5 to-houtcore-gold/5 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 border border-houtcore-brown/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 text-center">
                <div className="group">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-houtcore-gold mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-500">
                    15+
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-gray-300 font-light uppercase tracking-wider">
                    Jaar Ervaring
                  </div>
                </div>

                <div className="group">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-houtcore-brown mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-500">
                    100%
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-gray-300 font-light uppercase tracking-wider">
                    Maatwerk
                  </div>
                </div>

                <div className="group">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-houtcore-gold mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-500">
                    ∞
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-gray-300 font-light uppercase tracking-wider">
                    Mogelijkheden
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
