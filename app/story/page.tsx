"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Award, Heart } from "lucide-react"

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-[#2d3134] text-white">
      {/* Header with back button */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[#f2b451] hover:text-[#B89960] transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Terug naar home</span>
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-[#B89960] tracking-tight">
            Mijn <span className="font-bold">Verhaal</span>
          </h1>
          <div className="w-24 h-1 bg-[#f2b451] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            De reis van een passie naar een ambacht, van een droom naar Houtcore
          </p>
        </motion.div>
      </div>

      {/* Story content */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Timeline sections */}
          <div className="space-y-16">
            {/* Childhood */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-6 h-6 text-[#f2b451]" />
                  <h2 className="text-3xl font-bold text-[#f2b451]">Het Begin</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed text-gray-300">
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
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/wood-texture.jpeg" alt="Houtbewerking traditie" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3134]/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="lg:order-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Calendar className="w-6 h-6 text-[#B89960]" />
                  <h2 className="text-3xl font-bold text-[#B89960]">2008 - De Opleiding</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed text-gray-300">
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
              <div className="lg:order-1 relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/woodworking-workshop.png" alt="Meubelmakeropleiding" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3134]/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-6 h-6 text-[#f2b451]" />
                  <h2 className="text-3xl font-bold text-[#f2b451]">Jaren van Ervaring</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed text-gray-300">
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
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/custom-wooden-furniture.png" alt="Maatwerk meubels" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3134]/60 to-transparent"></div>
              </div>
            </motion.section>

            {/* Houtcore birth */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-gradient-to-r from-[#f2b451]/5 via-[#B89960]/5 to-[#f2b451]/5 rounded-3xl p-12 border border-[#B89960]/20"
            >
              <h2 className="text-4xl font-bold text-[#B89960] mb-8">2023 - Houtcore is Geboren</h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-gray-300">
                <p>
                  Na jaren van ervaring opdoen en het ontwikkelen van mijn eigen stijl, besloot ik in 2023 de stap te
                  wagen: Houtcore was geboren.
                </p>
                <p>
                  Bij Houtcore draait alles om duurzaamheid en kwaliteit. Ik werk alleen met verantwoord geoogst hout en
                  gebruik technieken die ervoor zorgen dat uw meubel generaties lang meegaat.
                </p>
                <blockquote className="text-2xl font-light italic text-[#f2b451] leading-relaxed border-l-4 border-[#f2b451] pl-8 my-8">
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-3 bg-[#f2b451] text-[#2d3134] px-8 py-4 rounded-full font-semibold hover:bg-[#f2b451]/90 transition-all duration-300 shadow-xl"
            >
              <span>Laten we jouw verhaal maken</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
