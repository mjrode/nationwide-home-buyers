'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import { cn, scrollToElement, trackEvent } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '#hero' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Why Choose Us', href: '#benefits' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '')
    scrollToElement(elementId)
    setMobileMenuOpen(false)
    trackEvent('navigation_click', { section: elementId })
  }

  const handleGetOfferClick = () => {
    scrollToElement('contact')
    trackEvent('cta_click', { location: 'header' })
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-secondary-100'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg font-bold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => trackEvent('logo_click')}
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="hidden md:block whitespace-nowrap">Nationwide Home Buyers</span>
              <span className="md:hidden text-sm sm:text-base font-bold">NHB</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right side - Phone & CTA */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
            {/* Phone number - hidden on mobile */}
            <a
              href="tel:+1-512-635-9847"
              className="hidden lg:flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => trackEvent('phone_click', { location: 'header' })}
            >
              <PhoneIcon className="w-5 h-5" />
              <span className="font-semibold whitespace-nowrap">(512) 635-9847</span>
            </a>

            {/* Get Offer Button */}
            <button
              onClick={handleGetOfferClick}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-md sm:rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs sm:text-sm lg:text-base whitespace-nowrap"
            >
              <span className="hidden sm:inline">Get Cash Offer</span>
              <span className="sm:hidden">Get Offer</span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-1 sm:p-1.5 text-secondary-700 hover:text-primary-600 transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-secondary-100 bg-white/95 backdrop-blur-md">
            <div className="py-2 px-1 space-y-0.5">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 rounded-lg font-medium text-sm"
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile phone number */}
              <a
                href="tel:+1-512-635-9847"
                className="flex items-center space-x-2 px-3 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 rounded-lg font-medium text-sm"
                onClick={() => trackEvent('phone_click', { location: 'mobile_menu' })}
              >
                <PhoneIcon className="w-4 h-4" />
                <span>Call: (512) 635-9847</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
