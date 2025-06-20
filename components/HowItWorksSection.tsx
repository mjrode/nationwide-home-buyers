'use client'

import { MapPinIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const steps = [
  {
    id: 1,
    title: 'Submit Your Address',
    description: 'Submit your address and we\'ll prepare your offer. Our dedicated team works quickly to prepare your cash offer within 24 hours or less.',
    icon: MapPinIcon,
    color: 'from-primary-500 to-primary-600'
  },
  {
    id: 2,
    title: 'Receive An Offer In 24 Hours',
    description: 'We present you with your cash offer and you choose the close date that works for your schedule.',
    icon: ClockIcon,
    color: 'from-accent-500 to-accent-600'
  },
  {
    id: 3,
    title: 'Get Ready To Close',
    description: 'We\'ll promptly find a local licensed and insured closing company to manage the transaction details for a smooth process.',
    icon: CheckCircleIcon,
    color: 'from-success-500 to-success-600'
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section bg-secondary-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Here's How It Works
          </h2>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process gets you from property listing to cash in hand faster than traditional real estate sales.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10 text-center group">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-secondary-900 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.id}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-secondary-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card bg-white/10 backdrop-blur-sm border border-white/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-secondary-300 mb-6">
              Join thousands of satisfied homeowners who chose the fast, easy way to sell their house.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Get My Cash Offer Now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">24hrs</div>
            <div className="text-secondary-300">Average Offer Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">5,000+</div>
            <div className="text-secondary-300">Houses Purchased</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-success-400 mb-2">50</div>
            <div className="text-secondary-300">States Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">4.9★</div>
            <div className="text-secondary-300">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
