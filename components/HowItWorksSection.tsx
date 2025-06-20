'use client'

import { MapPinIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { scrollToElement, trackEvent } from '@/lib/utils'

const steps = [
  {
    id: 1,
    title: 'Submit Your Address',
    description: 'Submit your address and we\'ll prepare your offer. Our dedicated team works quickly to prepare your cash offer within 24 hours or less.',
    icon: MapPinIcon,
    color: 'from-primary-500 to-primary-600',
    shortDesc: 'Just your address'
  },
  {
    id: 2,
    title: 'Receive An Offer In 24 Hours',
    description: 'We present you with your cash offer and you choose the close date that works for your schedule.',
    icon: ClockIcon,
    color: 'from-accent-500 to-accent-600',
    shortDesc: 'Fair cash offer'
  },
  {
    id: 3,
    title: 'Get Ready To Close',
    description: 'We\'ll promptly find a local licensed and insured closing company to manage the transaction details for a smooth process.',
    icon: CheckCircleIcon,
    color: 'from-success-500 to-success-600',
    shortDesc: 'Quick closing'
  }
]

const stats = [
  { value: '24hrs', label: 'Average Offer Time', color: 'text-primary-400' },
  { value: '5,000+', label: 'Houses Purchased', color: 'text-accent-400' },
  { value: '50', label: 'States Covered', color: 'text-success-400' },
  { value: '4.9★', label: 'Customer Rating', color: 'text-primary-400' }
]

export default function HowItWorksSection() {
  const handleCTAClick = () => {
    scrollToElement('contact')
    trackEvent('how_it_works_cta_click')
  }

  return (
    <section id="how-it-works" className="section bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-success-500 rounded-full blur-2xl animate-pulse animation-delay-200" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-white rounded-lg rotate-45 animate-float" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-white rounded-full animate-float animation-delay-600" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-8 bg-white rounded-full animate-float animation-delay-800" />
      </div>

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6 hover:bg-white/20 transition-all duration-200">
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            Here's How It Works
          </h2>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Our streamlined process gets you from property listing to cash in hand faster than traditional real estate sales.
          </p>
        </div>

        {/* Steps - Mobile and Desktop Optimized */}
        <div className="mb-20">
          {/* Mobile: Vertical Stack */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="animate-slide-up" style={{ animationDelay: `${index * 200 + 400}ms` }}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg relative`}>
                      <step.icon className="w-8 h-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-secondary-900 rounded-full flex items-center justify-center font-bold text-xs">
                        {step.id}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-secondary-300 text-sm leading-relaxed mb-2">
                        {step.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary-600/20 text-primary-300 text-xs font-semibold rounded-full">
                        {step.shortDesc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowRightIcon className="w-6 h-6 text-white/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 200 + 400}ms` }}>
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2 z-0" />
                )}

                <div className="relative z-10 text-center group">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                    <step.icon className="w-10 h-10 text-white" />

                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-secondary-900 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-secondary-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                    {step.shortDesc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mb-20 animate-slide-up animation-delay-800">
          <div className="glass-effect border border-white/20 p-8 md:p-12 max-w-3xl mx-auto rounded-3xl relative overflow-hidden">
            {/* CTA Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-300 rounded-full blur-xl" />
            </div>

            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-secondary-300 mb-8 text-lg leading-relaxed">
                Join thousands of satisfied homeowners who chose the fast, easy way to sell their house.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleCTAClick}
                  className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="flex items-center">
                    Get My Cash Offer Now
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>

                <a
                  href="tel:+1-512-635-9847"
                  className="flex items-center text-white/80 hover:text-white font-semibold transition-colors duration-200"
                  onClick={() => trackEvent('how_it_works_phone_click')}
                >
                  <span className="text-lg">📞</span>
                  <span className="ml-2">Or call: (512) 635-9847</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="animate-slide-up animation-delay-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Trusted by Thousands</h3>
            <p className="text-secondary-300">Here's what we've accomplished together</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-secondary-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
