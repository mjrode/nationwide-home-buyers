'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { QuoteIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Phoenix, AZ',
    rating: 5,
    text: 'I inherited my grandmother\'s house and it needed so many repairs. Nationwide Home Buyers made an offer within 24 hours and we closed in 2 weeks. No stress, no hassle!',
    situation: 'Inherited Property'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    location: 'Austin, TX',
    rating: 5,
    text: 'Going through a divorce and needed to sell quickly. The team was professional, understanding, and got us a fair cash offer. Closed exactly when we needed to.',
    situation: 'Divorce Sale'
  },
  {
    id: 3,
    name: 'Jennifer Chen',
    location: 'Denver, CO',
    rating: 5,
    text: 'Our house had water damage and we couldn\'t afford the repairs. Nationwide bought it as-is for a fair price. The whole process was transparent and honest.',
    situation: 'As-Is Sale'
  },
  {
    id: 4,
    name: 'Robert Williams',
    location: 'Orlando, FL',
    rating: 5,
    text: 'Needed to relocate for work on short notice. They handled everything and we closed in 12 days. Professional service from start to finish.',
    situation: 'Job Relocation'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    location: 'Seattle, WA',
    rating: 5,
    text: 'My rental property was more trouble than it was worth. Tenants had trashed it, but Nationwide still made a fair offer. So relieved to be done with it!',
    situation: 'Problem Rental'
  },
  {
    id: 6,
    name: 'David Park',
    location: 'Chicago, IL',
    rating: 5,
    text: 'Facing foreclosure and thought I\'d lose everything. The team helped me avoid foreclosure and got me enough to start fresh. Forever grateful!',
    situation: 'Foreclosure Avoidance'
  }
]

const stats = [
  { value: '4.9', label: 'Average Rating', suffix: '★' },
  { value: '5,000+', label: 'Happy Customers', suffix: '' },
  { value: '98%', label: 'Would Recommend', suffix: '' },
  { value: '15', label: 'Years in Business', suffix: '+' }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success-100 rounded-full text-success-700 font-semibold text-sm mb-6">
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what thousands of satisfied homeowners have to say about their experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-secondary-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6 hover:shadow-medium transition-all duration-300 group relative">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 text-primary-200 group-hover:text-primary-300 transition-colors duration-300">
                <QuoteIcon className="w-full h-full" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-secondary-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="border-t border-secondary-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-secondary-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-secondary-500">
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                    {testimonial.situation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-secondary-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Trusted & Accredited
            </h3>
            <p className="text-secondary-600">
              We're proud members of respected industry organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Placeholder for trust badges */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <span className="text-secondary-500 font-bold text-sm">BBB</span>
              </div>
              <div className="text-sm text-secondary-600">A+ Rating</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <span className="text-secondary-500 font-bold text-sm">NREI</span>
              </div>
              <div className="text-sm text-secondary-600">Member</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <span className="text-secondary-500 font-bold text-sm">REIA</span>
              </div>
              <div className="text-sm text-secondary-600">Certified</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <span className="text-secondary-500 font-bold text-sm">SSL</span>
              </div>
              <div className="text-sm text-secondary-600">Secured</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Ready to Join Our Happy Customers?
            </h3>
            <p className="text-secondary-600 mb-8">
              Experience the same stress-free, professional service that thousands of homeowners have trusted.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Get Your Cash Offer Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
