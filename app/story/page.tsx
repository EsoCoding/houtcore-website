"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Award, Heart } from "lucide-react"
import { useState, useEffect } from "react"

export default function StoryPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <main className="min-h-screen bg-houtcore-charcoal text-white">
      {/* Header with back button */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isMobile ? 0.8 : 0.4,
            ease: "easeOut",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-houtcore-gold hover:text-houtcore-brown transition-colors duration-400 mb-6 lg:mb-8"
          >
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">Terug naar home</span>
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isMobile ? 0.9 : 0.5,
            ease: "easeOut",
          }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 lg:mb-6 text-houtcore-brown tracking-tight">
            Mijn <span className="font-bold">Verhaal</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-houtcore-gold mx-auto mb-4 lg:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            De reis van een passie naar een ambacht, van een droom naar Houtcore
          </p>
        </motion.div>
      </div>

      {/* Story content */}
      <div className="container mx-auto px-4 sm:px-6 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Timeline sections */}
          <div className="space-y-12 lg:space-y-16">
            {/* Childhood */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.5,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-houtcore-gold" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-houtcore-gold">Het Begin</h2>
                </div>
                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg leading-relaxed text-gray-300">
                  <p>
                    Mijn passie voor houtbewerking begon al op jonge leeftijd. Ik herinner me nog de geur van vers
                    gezaagd hout in de werkplaats van mijn opa, waar ik urenlang kon kijken naar zijn behendigheid met
                    traditionele gereedschappen.
                  </p>
                  <p>
                    Die momenten hebben een onuitwisbare indruk op me gemaakt. De precisie, de geduld, en vooral de
                    trots waarmee hij elk project voltooide - dat wilde ik ook.
                  </p>
                </div>
              </div>
              <div className="relative h-64 sm:h-72 lg:h-80 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/wood-texture.jpeg" alt="Houtbewerking traditie" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-houtcore-charcoal/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.5,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:order-2">
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-houtcore-brown" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-houtcore-gold">2008 - De Opleiding</h2>
                </div>
                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg leading-relaxed text-gray-300">
                  <p>
                    In 2008 gaf ik richting aan mijn passie met een professionele meubelmakeropleiding. Hier leerde ik
                    niet alleen de technische aspecten van het vak, maar ook de kunst van het luisteren naar materiaal.
                  </p>
                  <p>
                    Elk stuk hout heeft zijn eigen verhaal, zijn eigen karakter. Leren werken met de nerf, de
                    natuurlijke beweging respecteren - dat zijn lessen die je alleen door ervaring leert.
                  </p>
                </div>
              </div>
              <div className="lg:order-1 relative h-64 sm:h-72 lg:h-80 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/woodworking-workshop.png" alt="Meubelmakeropleiding" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-houtcore-charcoal/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.5,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-houtcore-gold" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-houtcore-gold">Jaren van Ervaring</h2>
                </div>
                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg leading-relaxed text-gray-300">
                  <p>
                    Na mijn opleiding heb ik gewerkt bij verschillende meubelmakers, waar ik niet alleen technische
                    vaardigheden ontwikkelde, maar ook leerde luisteren naar wat klanten echt willen.
                  </p>
                  <p>
                    Elk project werd een samenwerking tussen vakmanschap en visie. Ik ontdekte dat de mooiste stukken
                    ontstaan wanneer functionaliteit en esthetiek perfect samenkomen.
                  </p>
                </div>
              </div>
              <div className="relative h-64 sm:h-72 lg:h-80 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/custom-wooden-furniture.png" alt="Maatwerk meubels" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-houtcore-charcoal/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Houtcore birth */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.5,
                ease: "easeOut",
              }}
              className="text-center bg-gradient-to-r from-houtcore-gold/5 via-houtcore-brown/5 to-houtcore-gold/5 rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-houtcore-brown/20"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-houtcore-brown mb-6 lg:mb-8">
                2023 - Houtcore is Geboren
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6 text-base lg:text-lg leading-relaxed text-gray-300">
                <p>
                  Na jaren van ervaring opdoen en het ontwikkelen van mijn eigen stijl, besloot ik in 2023 de stap te
                  wagen: Houtcore was geboren.
                </p>
                <p>
                  Bij Houtcore draait alles om duurzaamheid en kwaliteit. Ik werk alleen met verantwoord geoogst hout en
                  gebruik technieken die ervoor zorgen dat uw meubel generaties lang meegaat.
                </p>
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-houtcore-gold leading-relaxed border-l-4 border-houtcore-gold pl-4 lg:pl-8 my-6 lg:my-8">
                  "Vakmanschap is de kunst van het perfect maken van iets unieks."
                </blockquote>
                <p>
                  Elk project begint met luisteren naar jouw verhaal. Want elk stuk dat ik maak, moet perfect passen bij
                  jouw leven, jouw ruimte, jouw dromen.
                </p>
              </div>
            </motion.section>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: isMobile ? 0.8 : 0.5,
              ease: "easeOut",
            }}
            className="text-center mt-12 lg:mt-16"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 lg:space-x-3 bg-houtcore-gold text-houtcore-charcoal px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold hover:bg-houtcore-gold/90 transition-all duration-400 shadow-xl text-sm lg:text-base"
            >
              <span>Laten we jouw verhaal maken</span>
              <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
