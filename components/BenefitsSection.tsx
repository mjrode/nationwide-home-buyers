'use client'

import {
  XMarkIcon,
  CheckIcon,
  HomeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { scrollToElement, trackEvent } from '@/lib/utils'

const benefits = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'No Clean Up or Fix Up Needed',
    description: 'We buy houses in all sorts of conditions – some even worse than you could imagine. Whether it\'s a beat-up rental, smoke-stained walls, foreclosure, or just plain trashed, we\'re still interested!',
    highlight: 'Any Condition'
  },
  {
    icon: UserGroupIcon,
    title: 'No Real Estate Agents',
    description: 'We\'re NOT real estate agents. We don\'t want to list your house or help you sell it; we want to buy it straight from you. No commissions, no listings, no hassle.',
    highlight: 'No Commission'
  },
  {
    icon: ClockIcon,
    title: 'Lightning-Fast Transactions',
    description: 'We can close the deal as soon as you\'d like, even within a few days if needed! No more waiting for buyers to get mortgages, appraisals, or other conventional house-selling delays.',
    highlight: 'Fast Close'
  },
  {
    icon: CalendarDaysIcon,
    title: 'You Choose the Timeline',
    description: 'Whether you need to close in 10 days or 60 days, we work on your schedule. You have complete control over the closing date that works best for your situation.',
    highlight: 'Your Schedule'
  }
]

const comparisonItems = [
  {
    category: 'Hassles',
    items: [
      { label: 'Risk of buyer financing fall-through', traditional: true, us: false },
      { label: 'Hours of prep work and home showings', traditional: true, us: false },
      { label: 'Manage repairs yourself', traditional: true, us: false },
      { label: 'Uncertain closing timeline', traditional: true, us: false }
    ]
  },
  {
    category: 'Benefits',
    items: [
      { label: 'Competitive cash offer in 24 hours', traditional: false, us: true },
      { label: 'No listing, prep work or showings', traditional: false, us: true },
      { label: 'Skip the repair work', traditional: false, us: true },
      { label: 'Choose any close date (10-60 days)', traditional: false, us: true }
    ]
  }
]

export default function BenefitsSection() {
  const handleCTAClick = () => {
    scrollToElement('contact')
    trackEvent('benefits_cta_click')
  }

  return (
    <section id="benefits" className="section bg-gradient-to-br from-secondary-25 via-white to-primary-25 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-accent-500 rounded-full blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-success-500 rounded-full blur-2xl animate-pulse animation-delay-200" />
      </div>

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full text-primary-700 font-semibold text-sm mb-6 hover:scale-105 transition-transform duration-200">
            <CheckIcon className="w-4 h-4 mr-2" />
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 animate-slide-up">
            Why Selling To <span className="gradient-text">Nationwide Home Buyers</span> Is Better
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Experience the stress-free way to sell your house. No repairs, no showings, no uncertainty.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card p-8 hover:shadow-xl transition-all duration-300 group animate-slide-up relative overflow-hidden"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                      {benefit.highlight}
                    </span>
                  </div>
                  <p className="text-secondary-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Comparison Section */}
        <div className="animate-slide-up animation-delay-600">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Traditional Home Sale vs. <span className="gradient-text">Selling To Us</span>
            </h3>
            <p className="text-lg text-secondary-600">
              See the difference for yourself
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {comparisonItems.map((category, categoryIndex) => (
              <div key={category.category} className="space-y-4">
                <h4 className="text-xl font-bold text-secondary-900 mb-6 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    category.category === 'Hassles' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {category.category === 'Hassles' ? (
                      <XMarkIcon className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckIcon className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  {category.category}
                </h4>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-xl p-5 shadow-soft hover:shadow-lg transition-all duration-300 border border-secondary-100">
                      <div className="space-y-4">
                        <div className="text-secondary-900 font-medium text-sm leading-relaxed">
                          {item.label}
                        </div>

                        <div className="flex items-center justify-around pt-3 border-t border-secondary-100">
                          {/* Traditional column */}
                          <div className="text-center flex-1">
                            <div className="text-xs text-secondary-500 mb-2 font-medium">Traditional</div>
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mx-auto ${
                              item.traditional
                                ? 'bg-red-100'
                                : 'bg-gray-100'
                            }`}>
                              <XMarkIcon className={`w-5 h-5 ${
                                item.traditional ? 'text-red-600' : 'text-gray-400'
                              }`} />
                            </div>
                          </div>

                          <div className="w-px h-8 bg-secondary-200 mx-4" />

                          {/* Us column */}
                          <div className="text-center flex-1">
                            <div className="text-xs text-secondary-500 mb-2 font-medium">Our Way</div>
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mx-auto ${
                              item.us ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {item.us ? (
                                <CheckIcon className="w-5 h-5 text-green-600" />
                              ) : (
                                <XMarkIcon className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '24hrs', label: 'Average Offer Time' },
              { value: '5,000+', label: 'Houses Purchased' },
              { value: '50', label: 'States Covered' },
              { value: '4.9★', label: 'Customer Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border border-secondary-100">
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20 mb-16">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white shadow-strong relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-300 rounded-full blur-2xl" />
            </div>

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied homeowners who chose the fast, easy, and stress-free way to sell their house.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={handleCTAClick}
                  className="btn bg-white text-primary-700 hover:bg-secondary-50 btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="flex items-center">
                    Get My Cash Offer Today
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>

                <a
                  href="tel:+1-512-635-9847"
                  className="flex items-center text-primary-100 hover:text-white font-semibold transition-colors duration-200"
                  onClick={() => trackEvent('benefits_phone_click')}
                >
                  <span className="text-lg">📞</span>
                  <span className="ml-2">Or call: (512) 635-9847</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
