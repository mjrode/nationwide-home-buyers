import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import BenefitsSection from '@/components/BenefitsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
