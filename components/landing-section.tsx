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

  // Enhanced parallax effects that work in both directions
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section id="home" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Wood texture background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <Image src="/wood-texture.jpeg" alt="Wood texture background" fill priority className="object-cover" />
      </motion.div>

      {/* Content with parallax effect */}
      <motion.div className="relative z-10 text-center px-4" style={{ opacity, y, scale }}>
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Houtcore Logo"
            width={500}
            height={500}
            className="mx-auto w-auto h-auto max-w-[80vw]"
          />
        </div>
      </motion.div>
    </section>
  )
}
