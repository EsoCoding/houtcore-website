import Header from "@/components/header"
import LandingSection from "@/components/landing-section"
import AboutSection from "@/components/about-section"
import ProcessSection from "@/components/process-section"
import PortfolioSection from "@/components/portfolio-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <LandingSection />
      <AboutSection />
      <ProcessSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
