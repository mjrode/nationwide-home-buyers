'use client'

import { useState, useEffect } from 'react'
import { CurrencyDollarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { cn, scrollToElement, trackEvent } from '@/lib/utils'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingUp = currentScrollY < lastScrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show after scrolling past hero section but not near the bottom
      const shouldShow = currentScrollY > windowHeight * 0.8 &&
                        currentScrollY < documentHeight - windowHeight * 1.5

      // Only show if not dismissed and hasn't been on page too long
      setIsVisible(shouldShow && !isDismissed)
      setIsScrollingUp(scrollingUp)
      lastScrollY = currentScrollY

      // Auto-hide after 10 seconds of no scrolling
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (!hasInteracted) {
          setIsVisible(false)
        }
      }, 10000)
    }

    // Check for form interactions to hide CTA
    const handleFormFocus = () => {
      setHasInteracted(true)
      setIsVisible(false)
    }

    const handleFormClick = () => {
      setHasInteracted(true)
      setIsVisible(false)
    }

    // Listen for form interactions
    const forms = document.querySelectorAll('form')
    const inputs = document.querySelectorAll('input, textarea, select')

    forms.forEach(form => form.addEventListener('click', handleFormClick))
    inputs.forEach(input => input.addEventListener('focus', handleFormFocus))

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      forms.forEach(form => form.removeEventListener('click', handleFormClick))
      inputs.forEach(input => input.removeEventListener('focus', handleFormFocus))
      clearTimeout(scrollTimeout)
    }
  }, [isDismissed, hasInteracted])

  const handleClick = () => {
    scrollToElement('contact')
    trackEvent('floating_cta_click')
    setHasInteracted(true)
    setIsVisible(false)
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
    setIsVisible(false)
    trackEvent('floating_cta_dismissed')
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-40 transition-all duration-300',
      isScrollingUp ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
    )}>
      <div className="relative group">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-600 hover:bg-secondary-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          aria-label="Dismiss"
        >
          <XMarkIcon className="w-3 h-3" />
        </button>

        {/* Main CTA button */}
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 animate-bounce-gentle"
        >
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Get Cash Offer</span>
            <span className="sm:hidden">Get Offer</span>
          </div>

          {/* Subtle pulse ring */}
          <div className="absolute inset-0 bg-primary-600 rounded-2xl animate-ping opacity-10" />

          {/* Enhanced tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-secondary-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap relative">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                <span>Get your cash offer in 24 hours!</span>
              </div>
              {/* Arrow */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-secondary-900" />
            </div>
          </div>
        </button>

        {/* Progress indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse animation-delay-200" />
            <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse animation-delay-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
