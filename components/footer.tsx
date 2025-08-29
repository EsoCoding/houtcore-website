"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
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
    <footer className="bg-[#2d3134] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 relative">
                  <Image src="/logo.png" alt="Houtcore Logo" fill className="object-contain" />
                </div>
                <span className="text-[#B89960] text-2xl font-bold">Houtcore</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Ambachtelijk maatwerk in hout. Van eerste schets tot eindproduct, wij maken uw dromen werkelijkheid met
                vakmanschap en passie.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#f2b451]" />
                  <span className="text-gray-300">info@houtcore.nl</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#f2b451]" />
                  <span className="text-gray-300">+31 6 12345678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#f2b451]" />
                  <span className="text-gray-300">Nederland</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="text-[#B89960] text-lg font-bold mb-6">Navigatie</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-[#f2b451] transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-[#B89960] text-lg font-bold mb-6">Diensten</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-[#B89960] text-lg font-bold mb-6">Blijf op de hoogte</h3>

              <p className="text-gray-300 mb-4 text-sm">Ontvang updates over nieuwe projecten en inspiratie</p>

              {/* Newsletter signup */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Uw email"
                    className="flex-1 px-4 py-2 rounded-l-lg border-0 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f2b451]"
                  />
                  <button className="bg-[#f2b451] text-[#2d3134] px-4 py-2 rounded-r-lg hover:bg-[#f2b451]/90 transition-colors duration-300 font-medium">
                    →
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-300 mb-4 text-sm">Volg ons op social media</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/10 hover:bg-[#f2b451] text-white hover:text-[#2d3134] p-3 rounded-full transition-all duration-300"
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
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-[#B89960]/20 py-6"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">© {currentYear} Houtcore. Alle rechten voorbehouden.</p>

              <div className="flex items-center space-x-6 text-sm">
                <button className="text-gray-400 hover:text-[#f2b451] transition-colors duration-300">
                  Privacy Beleid
                </button>
                <button className="text-gray-400 hover:text-[#f2b451] transition-colors duration-300">
                  Algemene Voorwaarden
                </button>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">Gemaakt met ❤️ voor vakmanschap</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
