"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function LandingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const buttonY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])

  // Opacity transforms
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Scale transform
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const scrollToNext = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: "#2d3134",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
        <Image
          src="/wood-texture.jpeg"
          alt="Wood texture background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute inset-0 bg-[#2d3134]/50" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Logo Section */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          style={{
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <Image
              src="/logo.png"
              alt="Houtcore Logo"
              width={500}
              height={500}
              className="mx-auto max-w-[80vw] max-h-[50vh] w-auto h-auto drop-shadow-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8"
            >
              
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Button Section - Perfectly Centered */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-16"
          style={{
            y: buttonY,
            opacity: buttonOpacity,
          }}
        >
          
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
          }}
        >
          
        </motion.div>
      </div>
    </section>
  )
}
