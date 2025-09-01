"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />, href: "#", label: "Facebook" },
    { icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />, href: "#", label: "LinkedIn" },
  ]

  const quickLinks = [
    { name: "Over Ons", href: "#about" },
    { name: "Werkwijze", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    "Maatwerk Meubels",
    "Kasten & Opberging",
    "Trappen & Balustrades",
    "Interieur Ontwerp",
    "Restauratie",
    "Advies & Consultatie",
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""))
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <footer className="bg-houtcore-charcoal text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.4,
                ease: "easeOut",
              }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                  <Image src="/logo.png" alt="Houtcore Logo" fill className="object-contain" />
                </div>
                <span className="text-houtcore-brown text-xl lg:text-2xl font-bold">Houtcore</span>
              </div>

              <p className="text-gray-300 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                Ambachtelijk maatwerk in hout. Van eerste schets tot eindproduct, wij maken uw dromen werkelijkheid met
                vakmanschap en passie.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-houtcore-gold flex-shrink-0" />
                  <span className="text-gray-300 text-sm lg:text-base">info@houtcore.nl</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-houtcore-gold flex-shrink-0" />
                  <span className="text-gray-300 text-sm lg:text-base">+31 6 12345678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-houtcore-gold flex-shrink-0" />
                  <span className="text-gray-300 text-sm lg:text-base">Nederland</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0.2 : 0.1,
                duration: isMobile ? 0.8 : 0.4,
                ease: "easeOut",
              }}
            >
              <h3 className="text-houtcore-brown text-base lg:text-lg font-bold mb-4 lg:mb-6">Navigatie</h3>
              <ul className="space-y-2 lg:space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-houtcore-gold transition-colors duration-400 text-left text-sm lg:text-base"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0.4 : 0.2,
                duration: isMobile ? 0.8 : 0.4,
                ease: "easeOut",
              }}
            >
              <h3 className="text-houtcore-brown text-base lg:text-lg font-bold mb-4 lg:mb-6">Diensten</h3>
              <ul className="space-y-2 lg:space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-xs lg:text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0.6 : 0.3,
                duration: isMobile ? 0.8 : 0.4,
                ease: "easeOut",
              }}
            >
              <h3 className="text-houtcore-brown text-base lg:text-lg font-bold mb-4 lg:mb-6">Blijf op de hoogte</h3>

              <p className="text-gray-300 mb-4 text-xs lg:text-sm">
                Ontvang updates over nieuwe projecten en inspiratie
              </p>

              {/* Newsletter signup */}
              <div className="mb-4 lg:mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Uw email"
                    className="flex-1 px-3 lg:px-4 py-2 rounded-l-lg border-0 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-houtcore-gold text-sm lg:text-base transition-all duration-400"
                  />
                  <button className="bg-houtcore-gold text-houtcore-charcoal px-3 lg:px-4 py-2 rounded-r-lg hover:bg-houtcore-gold/90 transition-colors duration-400 font-medium text-sm lg:text-base">
                    →
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-300 mb-3 lg:mb-4 text-xs lg:text-sm">Volg ons op social media</p>
                <div className="flex space-x-2 lg:space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 hover:bg-houtcore-gold text-white hover:text-houtcore-charcoal p-2 lg:p-3 rounded-full transition-all duration-400"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: isMobile ? 0.8 : 0.4,
            duration: isMobile ? 0.8 : 0.4,
            ease: "easeOut",
          }}
          className="border-t border-houtcore-brown/20 py-4 lg:py-6"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <p className="text-gray-400 text-xs lg:text-sm text-center sm:text-left">
                © {currentYear} Houtcore. Alle rechten voorbehouden.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs lg:text-sm">
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <button className="text-gray-400 hover:text-houtcore-gold transition-colors duration-400">
                    Privacy Beleid
                  </button>
                  <button className="text-gray-400 hover:text-houtcore-gold transition-colors duration-400">
                    Algemene Voorwaarden
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="text-gray-400">Gemaakt met ❤️ voor vakmanschap</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
