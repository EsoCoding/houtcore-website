"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { fetchAboutSection, AboutSection as AboutSectionType } from "@/lib/api/about"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  const [isMobile, setIsMobile] = useState(false)
  const [aboutData, setAboutData] = useState<AboutSectionType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch about section data
  useEffect(() => {
    const getAboutData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAboutSection()
        console.log("About data received:", data) // Debug log to see what data looks like
        setAboutData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching about section:", err)
        setError("Failed to load about section data.")
      } finally {
        setIsLoading(false)
      }
    }
    
    getAboutData()
  }, [])
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
              duration: isMobile ? mobileAnimationDuration : desktopAnimationDuration,
              ease: "easeOut",
            }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 text-houtcore-brown tracking-tight font-bold">
                {aboutData?.title ? aboutData.title : "Over Houtcore"}
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-houtcore-gold mx-auto"></div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-houtcore-gold"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12 lg:mb-20">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{
                  duration: isMobile ? mobileAnimationDuration + 0.2 : desktopAnimationDuration + 0.1,
                  ease: "easeOut",
                  delay: isMobile ? 0.2 : 0.1,
                }}
                className="lg:col-span-7"
              >
                <div className="relative">
                  <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[450px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
                    <Image 
                      src={aboutData?.image || "/woodworking-workshop.png"} 
                      alt="Houtcore werkplaats" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{
                  duration: isMobile ? mobileAnimationDuration + 0.2 : desktopAnimationDuration + 0.1,
                  ease: "easeOut",
                  delay: isMobile ? 0.4 : 0.2,
                }}
                className="lg:col-span-5"
              >
                <ContentWithReadMore 
                  aboutData={aboutData} 
                  isMobile={isMobile}
                />
              </motion.div>
            </div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: isMobile ? 0.6 : 0.3,
              duration: isMobile ? mobileAnimationDuration : desktopAnimationDuration,
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

interface ContentWithReadMoreProps {
  aboutData: AboutSectionType | null;
  isMobile: boolean;
}

function ContentWithReadMore({ aboutData, isMobile }: ContentWithReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const maxHeight = 300; // Max height for collapsed state in pixels

  useEffect(() => {
    // Get the actual height of the content
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      setShouldShowButton(height > maxHeight);
    }
  }, [aboutData]);

  // Reset to collapsed state when window resizes between mobile/desktop
  useEffect(() => {
    setIsExpanded(false);
  }, [isMobile]);

  return (
    <div className="lg:pl-6 xl:pl-8">
      <h3 className="text-xl sm:text-2xl font-light mb-4 lg:mb-6 text-houtcore-gold">
        {aboutData?.subtitle || "De man achter het ambacht"}
      </h3>

      <div className="relative">
        <motion.div
          ref={contentRef}
          animate={{ 
            height: isExpanded ? contentHeight : maxHeight 
          }}
          initial={{ height: maxHeight }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 15 
          }}
          className="relative overflow-hidden"
        >
          {aboutData ? (
            <div 
              className="space-y-4 lg:space-y-5 text-base sm:text-lg leading-relaxed text-gray-300 font-light"
              dangerouslySetInnerHTML={{ __html: aboutData.main_content }}
            />
          ) : (
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
          )}

          {/* Animated gradient overlay with increased transparency */}
          <AnimatePresence>
            {!isExpanded && shouldShowButton && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(45,49,52,0.85)] to-transparent"
                style={{ backdropFilter: 'blur(1px)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {shouldShowButton && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-center"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2 bg-houtcore-brown/20 hover:bg-houtcore-brown/30 text-houtcore-gold border border-houtcore-gold/30 rounded-md transition-colors duration-300 text-sm flex items-center mx-auto"
              >
                <span>{isExpanded ? "Lees minder" : "Lees meer"}</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-1"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
