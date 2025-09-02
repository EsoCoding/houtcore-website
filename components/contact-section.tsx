"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { fetchContactInfo, ContactInfoItem } from "@/lib/api/contact"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [contactItems, setContactItems] = useState<ContactInfoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch contact information from API
  useEffect(() => {
    const getContactInfo = async () => {
      try {
        setLoading(true)
        const response = await fetchContactInfo()
        if (response && response.results) {
          setContactItems(response.results)
        }
      } catch (err) {
        setError("Failed to load contact information")
        console.error("Error loading contact information:", err)
      } finally {
        setLoading(false)
      }
    }

    getContactInfo()
  }, [])

  // Fallback contact info if API call fails
  const fallbackContactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-houtcore-gold" />,
      title: "Email",
      value: "info@houtcore.nl",
      description: "Stuur ons een bericht",
    },
    {
      icon: <Phone className="w-6 h-6 text-houtcore-gold" />,
      title: "Telefoon",
      value: "+31 6 12345678",
      description: "Bel voor direct contact",
    },
    {
      icon: <MapPin className="w-6 h-6 text-houtcore-gold" />,
      title: "Locatie",
      value: "Nederland",
      description: "Werkplaats & Showroom",
    },
  ]

  // Map icon names to components
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <Mail className="w-6 h-6 text-houtcore-gold" />
      case 'phone':
        return <Phone className="w-6 h-6 text-houtcore-gold" />
      case 'map-pin':
        return <MapPin className="w-6 h-6 text-houtcore-gold" />
      default:
        return <Mail className="w-6 h-6 text-houtcore-gold" />
    }
  }

  // Populate contact info with data from API or use fallback
  const contactInfo = contactItems.length > 0
    ? contactItems
        .filter(item => item.icon_name !== 'clock' && !item.title.toLowerCase().includes('openingstijden'))
        .map(item => ({
          icon: getIconByName(item.icon_name),
          title: item.title,
          value: item.value,
          description: item.description
        }))
    : fallbackContactInfo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const form = e.target as HTMLFormElement
      const formData = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
        subject: "Contactformulier bericht", // Default subject since project field is removed
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      }
      
      setFormSubmitted(true)
      
      // Import will be added dynamically to avoid circular dependencies
      const { submitContactForm } = await import('@/lib/api/contact')
      await submitContactForm(formData)
      
      // Reset form
      form.reset()
      
      // Show success message for 3 seconds
      setTimeout(() => setFormSubmitted(false), 3000)
    } catch (err) {
      console.error("Error submitting contact form:", err)
      alert("Er is een fout opgetreden bij het versturen van uw bericht. Probeer het later opnieuw.")
      setFormSubmitted(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-houtcore-gold text-houtcore-charcoal relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-houtcore-charcoal">Neem Contact Op</h2>
          <p className="text-xl text-houtcore-charcoal/80 max-w-2xl mx-auto">
            Heeft u een project in gedachten? Laten we er samen iets moois van maken.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-houtcore-charcoal">Kom in contact</h3>
              <p className="text-lg text-houtcore-charcoal/80 mb-8">
                Van eerste idee tot eindproduct, ik begeleid u door het hele proces. Neem contact op voor een
                vrijblijvend gesprek over uw project.
              </p>
              {error && (
                <div className="text-red-600 mb-4 p-2 bg-red-50 rounded-md">
                  {error}. De standaard contactgegevens worden weergegeven.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading ? (
                // Loading skeleton for contact info
                Array(3).fill(0).map((_, index) => (
                  <div key={`skeleton-${index}`} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-houtcore-charcoal/10">
                    <div className="flex items-start space-x-4">
                      <div className="bg-houtcore-charcoal/20 w-12 h-12 rounded-xl animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-houtcore-charcoal/20 w-1/2 mb-2 rounded animate-pulse"></div>
                        <div className="h-4 bg-houtcore-charcoal/10 w-3/4 mb-2 rounded animate-pulse"></div>
                        <div className="h-3 bg-houtcore-charcoal/10 w-2/3 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Actual contact info from API or fallback
                contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-houtcore-charcoal/10 hover:bg-white/90 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-houtcore-charcoal text-houtcore-gold p-3 rounded-xl flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-houtcore-charcoal mb-1">{info.title}</h4>
                        {info.title === "Adres" ? (
                          <div className="text-houtcore-charcoal font-medium mb-1">
                            {info.value.split(',').map((line, idx) => (
                              <div key={idx} className="leading-relaxed">{line.trim()}</div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-houtcore-charcoal font-medium mb-1">{info.value}</p>
                        )}
                        <p className="text-houtcore-charcoal/70 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-houtcore-charcoal/10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-houtcore-charcoal">Stuur een bericht</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-houtcore-charcoal">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-houtcore-charcoal/20 focus:outline-none focus:ring-2 focus:ring-houtcore-charcoal focus:border-transparent transition-all duration-300"
                      placeholder="Uw naam"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-houtcore-charcoal">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-houtcore-charcoal/20 focus:outline-none focus:ring-2 focus:ring-houtcore-charcoal focus:border-transparent transition-all duration-300"
                      placeholder="uw.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-houtcore-charcoal">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-xl border border-houtcore-charcoal/20 focus:outline-none focus:ring-2 focus:ring-houtcore-charcoal focus:border-transparent transition-all duration-300"
                    placeholder="+31 6 12345678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-houtcore-charcoal">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-houtcore-charcoal/20 focus:outline-none focus:ring-2 focus:ring-houtcore-charcoal focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Vertel ons over uw project..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formSubmitted}
                  className="w-full bg-houtcore-charcoal text-white py-4 rounded-xl font-semibold hover:bg-houtcore-charcoal/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Bericht Verzonden!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Verstuur Bericht</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
