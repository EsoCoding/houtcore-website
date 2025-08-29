"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Calendar, Eye, ArrowRight } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Massieve Eiken Tafel",
    category: "Tafels",
    year: "2024",
    description:
      "Handgemaakte tafel van duurzaam eikenhout. Ontworpen met aandacht voor detail en duurzaamheid. De natuurlijke uitstraling van het hout komt perfect tot zijn recht in dit tijdloze ontwerp.",
    imageUrl: "/dining-table.jpeg",
    features: ["Massief eikenhout", "Handgemaakt", "Duurzaam", "Maatwerk"],
  },
  {
    id: 2,
    title: "Inbouwkast met LED",
    category: "Kasten",
    year: "2024",
    description:
      "Op maat gemaakte kast met geïntegreerde verlichting. Perfect voor het opbergen van spullen en het creëren van een sfeervolle ambiance in uw woonruimte.",
    imageUrl: "/built-in-cabinet.jpeg",
    features: ["LED-verlichting", "Op maat", "Ingebouwd", "Modern design"],
  },
  {
    id: 3,
    title: "Houten Trap",
    category: "Trappen",
    year: "2023",
    description:
      "Minimalistische trap met houten treden. Een prachtige combinatie van functionaliteit en design die elke ruimte opwaardeert.",
    imageUrl: "/wooden-staircase.jpeg",
    features: ["Minimalistisch", "Functioneel", "Stijlvol", "Duurzaam"],
  },
  {
    id: 4,
    title: "Design Hanglamp",
    category: "Verlichting",
    year: "2023",
    description:
      "Unieke hanglamp met industriële uitstraling. Handgemaakt met aandacht voor detail en duurzame materialen.",
    imageUrl: "/pendant-lamp.jpeg",
    features: ["Industrieel design", "Handgemaakt", "Uniek", "Sfeerverlichting"],
  },
  {
    id: 5,
    title: "Witte Balustrade",
    category: "Trappen",
    year: "2023",
    description:
      "Strakke witte balustrade met houten details. Een veilige en stijlvolle toevoeging aan uw trap of overloop.",
    imageUrl: "/white-railing.jpeg",
    features: ["Strak design", "Veilig", "Wit met hout", "Modern"],
  },
  {
    id: 6,
    title: "Maatwerk Meubels",
    category: "Meubels",
    year: "2024",
    description:
      "Meubels op maat voor elke ruimte. Ontworpen en gemaakt volgens uw wensen en perfect passend in uw interieur.",
    imageUrl: "/custom-wooden-furniture.png",
    features: ["Volledig maatwerk", "Uniek ontwerp", "Perfecte pasvorm", "Kwaliteit"],
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  // Timeline progress
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-[#2d3134] text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 text-[#f2b451]">Ons Portfolio</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ontdek onze recent voltooide projecten en laat u inspireren door vakmanschap
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Central Timeline Line - Fixed positioning */}
          <div
            className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 hidden lg:block"
            style={{ width: "2px" }}
          >
            {/* Background line */}
            <div className="w-full h-full bg-[#B89960]/30"></div>
            {/* Progress line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#f2b451] origin-top"
              style={{
                height: timelineProgress,
              }}
            />
          </div>

          {/* Portfolio Items */}
          <div className="space-y-32">
            {portfolioItems.map((item, index) => (
              <PortfolioItem key={item.id} item={item} index={index} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <button className="bg-[#f2b451] text-[#2d3134] px-8 py-4 rounded-full font-semibold hover:bg-[#f2b451]/90 transition-all duration-300 hover:shadow-xl inline-flex items-center space-x-2">
            <span>Bekijk Alle Projecten</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function PortfolioItem({ item, index, isEven }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { amount: 0.3 })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline Node - Perfectly centered */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="relative"
        >
          {/* Outer ring */}
          <div className="w-8 h-8 bg-[#2d3134] rounded-full flex items-center justify-center border-4 border-[#f2b451] shadow-2xl">
            {/* Inner dot */}
            <div className="w-3 h-3 bg-[#B89960] rounded-full"></div>
          </div>

          {/* Project Number Badge */}
          
        </motion.div>
      </div>

      {/* Content Container - Flex layout for perfect alignment */}
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            {/* Project Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-[#B89960]">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{item.year}</span>
                <span className="w-2 h-2 bg-[#f2b451] rounded-full"></span>
                <span className="font-medium">{item.category}</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white">{item.title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {item.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.6 + featureIndex * 0.1, duration: 0.5 }}
                  className="bg-[#f2b451]/10 border border-[#f2b451]/20 text-[#f2b451] px-3 py-2 rounded-lg text-sm font-medium text-center"
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#f2b451] text-[#2d3134] px-6 py-3 rounded-full font-semibold hover:bg-[#f2b451]/90 transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Project Details</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 100 : -100 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="relative group">
              {/* Main Image */}
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-[#B89960]/20">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                  } group-hover:scale-105`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3134]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* View Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-[#f2b451] text-[#2d3134] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-[#2d3134]/90 backdrop-blur-sm text-[#f2b451] px-4 py-2 rounded-full text-sm font-semibold">
                {item.category}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
