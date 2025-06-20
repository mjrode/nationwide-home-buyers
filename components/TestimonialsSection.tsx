'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { scrollToElement, trackEvent } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Phoenix, AZ',
    rating: 5,
    text: 'I inherited my grandmother\'s house and it needed so many repairs. Nationwide Home Buyers made an offer within 24 hours and we closed in 2 weeks. No stress, no hassle!',
    situation: 'Inherited Property',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    location: 'Austin, TX',
    rating: 5,
    text: 'Going through a divorce and needed to sell quickly. The team was professional, understanding, and got us a fair cash offer. Closed exactly when we needed to.',
    situation: 'Divorce Sale',
    avatar: 'MR'
  },
  {
    id: 3,
    name: 'Jennifer Chen',
    location: 'Denver, CO',
    rating: 5,
    text: 'Our house had water damage and we couldn\'t afford the repairs. Nationwide bought it as-is for a fair price. The whole process was transparent and honest.',
    situation: 'As-Is Sale',
    avatar: 'JC'
  },
  {
    id: 4,
    name: 'Robert Williams',
    location: 'Orlando, FL',
    rating: 5,
    text: 'Needed to relocate for work on short notice. They handled everything and we closed in 12 days. Professional service from start to finish.',
    situation: 'Job Relocation',
    avatar: 'RW'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    location: 'Seattle, WA',
    rating: 5,
    text: 'My rental property was more trouble than it was worth. Tenants had trashed it, but Nationwide still made a fair offer. So relieved to be done with it!',
    situation: 'Problem Rental',
    avatar: 'LT'
  },
  {
    id: 6,
    name: 'David Park',
    location: 'Chicago, IL',
    rating: 5,
    text: 'Facing foreclosure and thought I\'d lose everything. The team helped me avoid foreclosure and got me enough to start fresh. Forever grateful!',
    situation: 'Foreclosure Avoidance',
    avatar: 'DP'
  }
]

const stats = [
  { value: '4.9', label: 'Average Rating', suffix: '★', color: 'text-yellow-500' },
  { value: '5,000+', label: 'Happy Customers', suffix: '', color: 'text-primary-600' },
  { value: '98%', label: 'Would Recommend', suffix: '', color: 'text-success-600' },
  { value: '15+', label: 'Years in Business', suffix: '', color: 'text-accent-600' }
]

const trustBadges = [
  { name: 'BBB', subtitle: 'A+ Rating', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  { name: 'NREI', subtitle: 'Member', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  { name: 'REIA', subtitle: 'Certified', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  { name: 'SSL', subtitle: 'Secured', bgColor: 'bg-orange-100', textColor: 'text-orange-700' }
]

export default function TestimonialsSection() {
  const handleCTAClick = () => {
    scrollToElement('contact')
    trackEvent('testimonials_cta_click')
  }

  return (
    <section id="testimonials" className="section bg-gradient-to-br from-secondary-25 via-white to-primary-25 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-success-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary-500 rounded-full blur-3xl animate-pulse animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-500 rounded-full blur-2xl animate-pulse animation-delay-200" />
      </div>

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-success-100 to-success-200 rounded-full text-success-700 font-semibold text-sm mb-6 hover:scale-105 transition-transform duration-200">
            <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what thousands of satisfied homeowners have to say about their experience.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm border border-secondary-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                  {/* Subtle background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-secondary-600 font-medium text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="mb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-secondary-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden h-full">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative h-full flex flex-col">
                    {/* Header with avatar and rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                          <div className="text-sm text-secondary-500">{testimonial.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-secondary-700 leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Situation Badge */}
                    <div className="flex justify-end">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                        {testimonial.situation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Trust Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">
              Trusted & Accredited
            </h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We're proud members of respected industry organizations, ensuring your transaction is secure and professional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm border border-secondary-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 ${badge.bgColor} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`${badge.textColor} font-bold text-sm`}>{badge.name}</span>
                  </div>
                  <div className="text-sm text-secondary-600 font-medium">{badge.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white shadow-strong relative overflow-hidden max-w-4xl mx-auto">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-300 rounded-full blur-2xl" />
            </div>

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Happy Customers?
              </h3>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the same stress-free, professional service that thousands of homeowners have trusted.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleCTAClick}
                  className="btn bg-white text-primary-700 hover:bg-secondary-50 btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="flex items-center">
                    Get Your Cash Offer Now
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>

                <a
                  href="tel:+1-512-635-9847"
                  className="flex items-center text-primary-100 hover:text-white font-semibold transition-colors duration-200"
                  onClick={() => trackEvent('testimonials_phone_click')}
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
