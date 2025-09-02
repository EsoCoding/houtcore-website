"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Pencil, Hammer, CalendarCheck, Truck, ClipboardList, Ruler } from "lucide-react"
import { fetchProcessSteps, ProcessStep as ProcessStepType } from "@/lib/api/process"

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })
  const [processSteps, setProcessSteps] = useState<ProcessStepType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch process steps from the API
  useEffect(() => {
    const getProcessSteps = async () => {
      try {
        setIsLoading(true)
        const data = await fetchProcessSteps()
        setProcessSteps(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching process steps:", err)
        setError("Failed to load process steps.")
      } finally {
        setIsLoading(false)
      }
    }
    
    getProcessSteps()
  }, [])
  
  // Helper function to get the icon component based on icon_name
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'clipboard-list':
        return <ClipboardList size={32} />
      case 'pencil-ruler':
        return <Ruler size={32} />
      case 'calendar':
        return <CalendarCheck size={32} />
      case 'hammer':
        return <Hammer size={32} />
      case 'truck':
        return <Truck size={32} />
      default:
        return <Pencil size={32} />
    }
  }
  
  // Map API data to step format or use fallback data
  const steps = processSteps.length > 0 ? 
    processSteps.map((step, index) => ({
      icon: getIconByName(step.icon_name),
      title: step.title,
      content: step.description,
      color: index % 2 === 0 ? "bg-houtcore-gold" : "bg-houtcore-brown"
    })) : 
    [
      {
        icon: <ClipboardList size={32} />,
        title: "Kennismaking & Consultatie",
        content:
          "We beginnen met een vrijblijvend gesprek om uw wensen en ideeën te bespreken. Tijdens deze fase verkennen we de mogelijkheden, materialen en budget.",
        color: "bg-houtcore-gold",
      },
      {
        icon: <Ruler size={32} />,
        title: "Ontwerp & Voorstel",
        content:
          "Op basis van onze consultatie maak ik een ontwerp en gedetailleerd voorstel. Inclusief materiaalsamples, tijdlijn en een nauwkeurige offerte.",
        color: "bg-houtcore-brown",
      },
      {
        icon: <Hammer size={32} />,
        title: "Productie & Afwerking",
        content:
          "In mijn werkplaats gaat het maakproces van start. U wordt op de hoogte gehouden van de voortgang. Elk stuk krijgt de aandacht die het verdient.",
        color: "bg-houtcore-gold",
      },
      {
        icon: <Truck size={32} />,
        title: "Levering & Plaatsing",
        content:
          "Het eindproduct wordt zorgvuldig geleverd en indien nodig geïnstalleerd. We controleren samen of alles aan uw verwachtingen voldoet.",
        color: "bg-houtcore-brown",
      },
    ]

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 bg-houtcore-gold text-houtcore-charcoal relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/wood-texture.jpeg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-houtcore-charcoal">Onze Werkwijze</h2>
          <p className="text-xl text-houtcore-charcoal/80 max-w-2xl mx-auto">
            Van eerste schets tot eindproduct, elke stap wordt met zorg uitgevoerd
          </p>
        </motion.div>

        {/* Process steps */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-houtcore-charcoal"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-houtcore-charcoal/80 bg-white/50 backdrop-blur-sm p-4 rounded-lg inline-block">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
            {steps.map((step, index) => (
              <ProcessCard key={index} step={step} index={index} isInView={isInView} />
            ))}
          </div>
        )}

        {/* Process flow - desktop only */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-houtcore-charcoal/20 transform -translate-y-1/2"></div>
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-1 bg-houtcore-charcoal transform -translate-y-1/2"
          ></motion.div>
        </div>
      </div>
    </section>
  )
}

type Step = {
  icon: React.ReactNode
  title: string
  content: string
  color: string
}

type ProcessCardProps = {
  step: Step
  index: number
  isInView: boolean
}

function ProcessCard({ step, index, isInView }: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Card */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-houtcore-charcoal/10 shadow-xl h-full flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Step number */}
        <div className="absolute -top-4 left-8 bg-houtcore-charcoal text-white text-sm font-bold px-3 py-1 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Icon */}
        <div className="flex items-center mb-6">
          <div
            className={`${step.color} text-white p-4 rounded-xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
          >
            {step.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-houtcore-charcoal group-hover:text-houtcore-charcoal/80 transition-colors duration-300">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <p className="text-houtcore-charcoal/80 leading-relaxed flex-grow">{step.content}</p>
      </div>
    </motion.div>
  )
}
