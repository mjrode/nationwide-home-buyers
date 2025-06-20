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
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => trackEvent('logo_click')}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="hidden sm:block">Nationwide Home Buyers</span>
              <span className="sm:hidden">NHB</span>
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
          <div className="flex items-center space-x-4">
            {/* Phone number - hidden on mobile */}
            <a
              href="tel:+1-XXX-XXX-XXXX"
              className="hidden md:flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => trackEvent('phone_click', { location: 'header' })}
            >
              <PhoneIcon className="w-5 h-5" />
              <span className="font-semibold">(XXX) XXX-XXXX</span>
            </a>

            {/* Get Offer Button */}
            <button
              onClick={handleGetOfferClick}
              className="btn btn-primary btn-sm lg:btn-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="hidden sm:inline">Get Cash Offer</span>
              <span className="sm:hidden">Get Offer</span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 border-t border-secondary-100',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 rounded-lg font-medium"
              >
                {item.name}
              </button>
            ))}

            {/* Mobile phone number */}
            <a
              href="tel:+1-XXX-XXX-XXXX"
              className="flex items-center space-x-2 px-4 py-3 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 rounded-lg font-medium"
              onClick={() => trackEvent('phone_click', { location: 'mobile_menu' })}
            >
              <PhoneIcon className="w-5 h-5" />
              <span>Call: (XXX) XXX-XXXX</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
