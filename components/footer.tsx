"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchContactInfo, ContactInfoItem } from "@/lib/api/contact"

// Helper function to dynamically get the right icon component
const dynamicIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'mail':
      return Mail;
    case 'phone':
      return Phone;
    case 'map-pin':
      return MapPin;
    default:
      return null;
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const [isMobile, setIsMobile] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch contact information
  useEffect(() => {
    const getContactInfo = async () => {
      try {
        setIsLoading(true)
        const data = await fetchContactInfo()
        if (data && data.results) {
          // Sort by order field
          const sortedInfo = data.results.sort((a, b) => a.order - b.order)
          setContactInfo(sortedInfo)
        }
      } catch (err) {
        console.error("Error fetching contact info for footer:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    getContactInfo()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  ]

  const quickLinks = [
    { name: "Over Ons", href: "#about" },
    { name: "Werkwijze", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  const services = ["Maatwerk Meubels", "Kasten & Opberging", "Trappen & Balustrades", "Interieur Ontwerp"]

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.8 : 0.4,
                ease: "easeOut",
              }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 relative">
                  <Image src="/logo.png" alt="Houtcore Logo" fill className="object-contain" />
                </div>
                <span className="text-houtcore-brown text-2xl font-bold">Houtcore</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-base max-w-md">
                Ambachtelijk maatwerk in hout. Van eerste schets tot eindproduct, wij maken uw dromen werkelijkheid met
                vakmanschap en passie.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.length > 0 ? (
                  // Render dynamic contact info from API
                  contactInfo.map((info) => {
                    const IconComponent = dynamicIconComponent(info.icon_name)
                    
                    return (
                      <div key={info.id} className={`flex ${info.title === 'Adres' ? 'items-start' : 'items-center'} space-x-3`}>
                        {IconComponent && <IconComponent className={`w-4 h-4 text-houtcore-gold flex-shrink-0 ${info.title === 'Adres' ? 'mt-1' : ''}`} />}
                        {info.title === 'E-mail' ? (
                          <a
                            href={`mailto:${info.value}`}
                            className="text-gray-300 hover:text-houtcore-gold transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : info.title === 'Telefoon' ? (
                          <a
                            href={`tel:${info.value.replace(/\s+/g, '')}`}
                            className="text-gray-300 hover:text-houtcore-gold transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : info.title === 'Adres' ? (
                          <div className="text-gray-300">
                            {info.value.split(',').map((line, idx) => (
                              <div key={idx} className="leading-relaxed">{line.trim()}</div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-300">{info.value}</span>
                        )}
                      </div>
                    )
                  })
                ) : (
                  // Fallback static content if API fails or is still loading
                  <>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-houtcore-gold flex-shrink-0" />
                      <a
                        href="mailto:info@houtcore.nl"
                        className="text-gray-300 hover:text-houtcore-gold transition-colors duration-300"
                      >
                        info@houtcore.nl
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-houtcore-gold flex-shrink-0" />
                      <a
                        href="tel:+31612345678"
                        className="text-gray-300 hover:text-houtcore-gold transition-colors duration-300"
                      >
                        +31 6 12345678
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-houtcore-gold flex-shrink-0 mt-1" />
                      <div className="text-gray-300">
                        <div>Haimersweg 210</div>
                        <div>7547RR, Enschede</div>
                        <div>Nederland</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-300 mb-3 text-sm">Volg ons op social media</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 hover:bg-houtcore-gold text-white hover:text-houtcore-charcoal p-3 rounded-full transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
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
              <h3 className="text-houtcore-brown text-lg font-bold mb-6">Navigatie</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-houtcore-gold transition-colors duration-300 text-left"
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
              <h3 className="text-houtcore-brown text-lg font-bold mb-6">Diensten</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>

              {/* Back to top button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-flex items-center space-x-2 bg-houtcore-gold text-houtcore-charcoal px-4 py-2 rounded-full font-medium hover:bg-houtcore-gold/90 transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Terug naar boven</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: isMobile ? 0.6 : 0.3,
            duration: isMobile ? 0.8 : 0.4,
            ease: "easeOut",
          }}
          className="border-t border-houtcore-brown/20 py-6"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © {currentYear} Houtcore. Alle rechten voorbehouden.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <div className="flex items-center space-x-6">
                  <button className="text-gray-400 hover:text-houtcore-gold transition-colors duration-300">
                    Privacy Beleid
                  </button>
                  <button className="text-gray-400 hover:text-houtcore-gold transition-colors duration-300">
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
