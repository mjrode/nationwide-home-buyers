'use client'

import { useState, useEffect } from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { cn, scrollToElement, trackEvent } from '@/lib/utils'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < lastScrollY

      // Show after scrolling past hero section (roughly 80vh)
      const shouldShow = currentScrollY > window.innerHeight * 0.8

      setIsVisible(shouldShow)
      setIsScrollingUp(scrollingUp)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    scrollToElement('contact')
    trackEvent('floating_cta_click')
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-40 transition-all duration-300',
      isScrollingUp ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    )}>
      <button
        onClick={handleClick}
        className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse-slow"
      >
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-6 h-6" />
          <span className="hidden sm:inline">Get Cash Offer</span>
          <span className="sm:hidden">Get Offer</span>
        </div>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-primary-600 rounded-2xl animate-ping opacity-20" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-secondary-900 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Get your cash offer in 24 hours!
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-secondary-900" />
          </div>
        </div>
      </button>
    </div>
  )
}
