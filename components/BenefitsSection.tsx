'use client'

import {
  XMarkIcon,
  CheckIcon,
  HomeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'No Clean Up or Fix Up Needed',
    description: 'We buy houses in all sorts of conditions – some even worse than you could imagine. Whether it\'s a beat-up rental, smoke-stained walls, foreclosure, or just plain trashed, we\'re still interested!'
  },
  {
    icon: UserGroupIcon,
    title: 'No Real Estate Agents',
    description: 'We\'re NOT real estate agents. We don\'t want to list your house or help you sell it; we want to buy it straight from you. No commissions, no listings, no hassle.'
  },
  {
    icon: ClockIcon,
    title: 'Lightning-Fast Transactions',
    description: 'We can close the deal as soon as you\'d like, even within a few days if needed! No more waiting for buyers to get mortgages, appraisals, or other conventional house-selling delays.'
  },
  {
    icon: CalendarDaysIcon,
    title: 'You Choose the Timeline',
    description: 'Whether you need to close in 10 days or 60 days, we work on your schedule. You have complete control over the closing date that works best for your situation.'
  }
]

const comparisonData = [
  {
    feature: 'Risk of buyer financing fall-through',
    traditional: true,
    us: false
  },
  {
    feature: 'Hours of prep work and home showings',
    traditional: true,
    us: false
  },
  {
    feature: 'Manage repairs yourself',
    traditional: true,
    us: false
  },
  {
    feature: 'Uncertain closing timeline',
    traditional: true,
    us: false
  },
  {
    feature: 'Competitive cash offer in 24 hours',
    traditional: false,
    us: true
  },
  {
    feature: 'No listing, prep work or showings',
    traditional: false,
    us: true
  },
  {
    feature: 'Skip the repair work',
    traditional: false,
    us: true
  },
  {
    feature: 'Choose any close date (10-60 days)',
    traditional: false,
    us: true
  }
]

export default function BenefitsSection() {
  return (
    <section id="benefits" className="section bg-secondary-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold text-sm mb-6">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Why Selling To <span className="gradient-text">Nationwide Home Buyers</span> Is Better
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Experience the stress-free way to sell your house. No repairs, no showings, no uncertainty.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card p-8 hover:shadow-medium transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-strong overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-6">
            <h3 className="text-2xl font-bold mb-2">
              Traditional Home Sale vs. Selling To Us
            </h3>
            <p className="text-primary-100">
              See the difference for yourself
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-red-600">
                    Traditional Home Sale
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-green-600">
                    Selling To Nationwide Home Buyers
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-secondary-100 hover:bg-secondary-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-secondary-25'}`}
                  >
                    <td className="py-4 px-6 font-medium text-secondary-900">
                      {item.feature}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.traditional ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                          <XMarkIcon className="w-5 h-5 text-red-600" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                          <XMarkIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.us ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                          <CheckIcon className="w-5 h-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                          <XMarkIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-strong">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who chose the fast, easy, and stress-free way to sell their house.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn bg-white text-primary-700 hover:bg-secondary-50 btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Get My Cash Offer Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
