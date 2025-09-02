"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Calendar, Eye } from "lucide-react"
import { fetchPortfolioItems, PortfolioItem } from "@/lib/api/portfolio"

// Fallback data in case API fails
const fallbackPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Massieve Eiken Tafel",
    category: 1,
    category_name: "Tafels",
    year: "2024",
    description: "Handgemaakte tafel van duurzaam eikenhout. Ontworpen met aandacht voor detail en duurzaamheid.",
    image: "/dining-table.jpeg",
    features: ["Massief eikenhout", "Handgemaakt", "Duurzaam", "Maatwerk"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Inbouwkast met LED",
    category: 2,
    category_name: "Kasten",
    year: "2024",
    description: "Op maat gemaakte kast met geïntegreerde verlichting. Perfect voor opbergen en sfeer.",
    image: "/built-in-cabinet.jpeg",
    features: ["LED-verlichting", "Op maat", "Ingebouwd", "Modern design"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Houten Trap",
    category: 3,
    category_name: "Trappen",
    year: "2023",
    description: "Minimalistische trap met houten treden. Een prachtige combinatie van functionaliteit en design.",
    image: "/wooden-staircase.jpeg",
    features: ["Minimalistisch", "Functioneel", "Stijlvol", "Duurzaam"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Design Hanglamp",
    category: 4,
    category_name: "Verlichting",
    year: "2023",
    description: "Unieke hanglamp met industriële uitstraling. Handgemaakt met aandacht voor detail.",
    image: "/pendant-lamp.jpeg",
    features: ["Industrieel design", "Handgemaakt", "Uniek", "Sfeerverlichting"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    title: "Witte Balustrade",
    category: 3,
    category_name: "Trappen",
    year: "2023",
    description: "Strakke witte balustrade met houten details. Een veilige en stijlvolle toevoeging.",
    image: "/white-railing.jpeg",
    features: ["Strak design", "Veilig", "Wit met hout", "Modern"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    title: "Maatwerk Meubels",
    category: 5,
    category_name: "Meubels",
    year: "2024",
    description: "Meubels op maat voor elke ruimte. Ontworpen en gemaakt volgens uw wensen.",
    image: "/custom-wooden-furniture.png",
    features: ["Volledig maatwerk", "Uniek ontwerp", "Perfecte pasvorm", "Kwaliteit"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1 })
  const [isMobile, setIsMobile] = useState(false)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  
  // Fetch portfolio items from API
  useEffect(() => {
    const getPortfolioItems = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPortfolioItems()
        setPortfolioItems(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching portfolio items:", err)
        setError("Failed to load portfolio items. Using fallback data.")
        setPortfolioItems(fallbackPortfolioItems)
      } finally {
        setIsLoading(false)
      }
    }
    
    getPortfolioItems()
  }, [])

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 bg-houtcore-charcoal text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: isMobile ? 0.8 : 0.5,
            ease: "easeOut",
          }}
          className="text-center mb-12 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-houtcore-gold">Ons Portfolio</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Ontdek onze recent voltooide projecten en laat u inspireren door vakmanschap
          </p>
        </motion.div>

        {/* Mobile: Vertical Card Layout */}
        <div className="block lg:hidden">
          <div className="space-y-8">
            {portfolioItems.map((item, index) => (
              <MobilePortfolioCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop: Timeline Layout */}
        <div ref={timelineRef} className="relative hidden lg:block">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2" style={{ width: "2px" }}>
            <div className="w-full h-full bg-houtcore-brown/30"></div>
            <motion.div
              className="absolute top-0 left-0 w-full bg-houtcore-gold origin-top"
              style={{ height: timelineProgress }}
            />
          </div>

          {/* Portfolio Items */}
          <div className="space-y-32">
            {portfolioItems.map((item, index) => (
              <DesktopPortfolioItem key={item.id} item={item} index={index} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Animated Arrow CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: isMobile ? 0.4 : 0.3,
            duration: isMobile ? 0.8 : 0.5,
            ease: "easeOut",
          }}
          className="text-center mt-12 lg:mt-20"
        >
          <div className="relative group">
            <motion.button 
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className="bg-houtcore-gold/20 hover:bg-houtcore-gold text-houtcore-gold hover:text-houtcore-charcoal p-4 rounded-full transition-all duration-500 hover:shadow-xl flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                y: [0, 8, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              aria-label="Scroll naar Contact sectie"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </motion.button>
            
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-houtcore-charcoal text-houtcore-gold text-sm px-3 py-1 rounded-md whitespace-nowrap">
                Naar Contact
              </div>
              <div className="w-3 h-3 bg-houtcore-charcoal transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Mobile Portfolio Card Component
interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

interface DesktopPortfolioItemProps extends PortfolioCardProps {
  isEven: boolean;
}

function MobilePortfolioCard({ item, index }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { amount: 0.3 })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        delay: index * 0.15, // Slower stagger for mobile
        duration: 0.8, // Longer duration for mobile
        ease: "easeOut",
      }}
      className="bg-houtcore-brown/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-houtcore-brown/20 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-houtcore-charcoal/80 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-houtcore-gold text-houtcore-charcoal px-3 py-1 rounded-full text-xs font-semibold">
          {item.category_name}
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-houtcore-charcoal/80 backdrop-blur-sm text-houtcore-gold px-3 py-1 rounded-full text-xs font-semibold">
          {item.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">{item.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {item.features.map((feature: string, featureIndex: number) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                delay: 0.3 + featureIndex * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="bg-houtcore-gold/10 border border-houtcore-gold/20 text-houtcore-gold px-2 py-1 rounded-lg text-xs text-center"
            >
              {feature}
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-houtcore-gold text-houtcore-charcoal py-3 rounded-xl font-semibold hover:bg-houtcore-gold/90 transition-all duration-400 flex items-center justify-center space-x-2">
          <span>Project Details</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// Desktop Portfolio Item Component (Timeline)
function DesktopPortfolioItem({ item, index, isEven }: DesktopPortfolioItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { amount: 0.3 })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline Node */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
          className="w-8 h-8 bg-houtcore-charcoal rounded-full flex items-center justify-center border-4 border-houtcore-gold shadow-2xl"
        >
          <div className="w-3 h-3 bg-houtcore-brown rounded-full"></div>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-8 ${isEven ? "" : "flex-row-reverse"}`}>
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-houtcore-brown">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{item.year}</span>
                <span className="w-2 h-2 bg-houtcore-gold rounded-full"></span>
                <span className="font-medium">{item.category}</span>
              </div>
              <h3 className="text-3xl font-bold text-white">{item.title}</h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {item.features.map((feature: string, featureIndex: number) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + featureIndex * 0.05, duration: 0.3 }}
                  className="bg-houtcore-gold/10 border border-houtcore-gold/20 text-houtcore-gold px-3 py-2 rounded-lg text-sm font-medium text-center"
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="relative group">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl bg-houtcore-brown/20">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    imageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                  } group-hover:scale-105`}
                  onLoad={() => setImageLoaded(true)}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-houtcore-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-houtcore-gold text-houtcore-charcoal p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="absolute top-4 left-4 bg-houtcore-charcoal/90 backdrop-blur-sm text-houtcore-gold px-4 py-2 rounded-full text-sm font-semibold">
                {item.category}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
