"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
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

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Over Ons", id: "about" },
    { name: "Werkwijze", id: "process" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-houtcore-charcoal"
      style={{
        borderBottom: "none",
        boxShadow: "none",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 relative">
              <Image src="/logo.png" alt="Houtcore Logo" fill className="object-contain brightness-0 invert" />
            </div>
            <span className="text-houtcore-brown text-lg sm:text-2xl font-bold tracking-wide">Houtcore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-houtcore-gold transition-colors duration-300 font-medium text-sm xl:text-base"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-houtcore-gold text-houtcore-charcoal px-4 xl:px-6 py-2 rounded-full font-semibold hover:bg-houtcore-gold/90 transition-all duration-300 text-sm xl:text-base"
            >
              Offerte Aanvragen
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-houtcore-charcoal">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-houtcore-gold transition-colors duration-400 text-left py-2 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-houtcore-gold text-houtcore-charcoal px-6 py-3 rounded-full font-semibold hover:bg-houtcore-gold/90 transition-all duration-400 text-center mt-2"
              >
                Offerte Aanvragen
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
