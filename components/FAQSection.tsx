'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const faqs = [
  {
    id: 1,
    question: 'How quickly can you buy my house?',
    answer: 'We can typically provide a cash offer within 24 hours of receiving your property information. Once you accept our offer, we can close in as little as 7-10 days, or on a timeline that works for you - up to 60 days if needed.'
  },
  {
    id: 2,
    question: 'Do I need to make any repairs before selling?',
    answer: 'Absolutely not! We buy houses in any condition - from move-in ready homes to properties that need major repairs. Whether your house has foundation issues, roof problems, water damage, or needs cosmetic updates, we\'ll make you a fair cash offer as-is.'
  },
  {
    id: 3,
    question: 'Are there any fees or commissions?',
    answer: 'No! Unlike working with real estate agents, there are no commissions, listing fees, or hidden costs. We handle all closing costs, and the offer we make is the amount you\'ll receive at closing.'
  },
  {
    id: 4,
    question: 'How do you determine your offer price?',
    answer: 'Our offers are based on the current market value of your property, its condition, location, and recent comparable sales in your area. We use a comprehensive evaluation process to ensure you receive a fair, competitive offer.'
  },
  {
    id: 5,
    question: 'What types of properties do you buy?',
    answer: 'We buy all types of residential properties including single-family homes, condos, townhouses, multi-family properties, mobile homes, and land. We purchase properties in any condition and any situation.'
  },
  {
    id: 6,
    question: 'Is there any obligation after I receive an offer?',
    answer: 'None whatsoever! Our offers are completely free with no obligation. You can take time to consider our offer, compare it with other options, or simply say no. There\'s no pressure and no commitment required.'
  },
  {
    id: 7,
    question: 'Do you buy houses that are in foreclosure?',
    answer: 'Yes, we specialize in helping homeowners avoid foreclosure. We can often close quickly enough to help you avoid the foreclosure process entirely. Contact us immediately if you\'re facing foreclosure - time is critical.'
  },
  {
    id: 8,
    question: 'What if my house has tenants?',
    answer: 'We buy rental properties with tenants in place. We can work with you to handle the situation professionally, whether that means honoring existing leases or helping with tenant relocation if needed.'
  },
  {
    id: 9,
    question: 'How is this different from listing with a real estate agent?',
    answer: 'When you list with an agent, you pay commissions (typically 6%), may wait months for a sale, need to make repairs, stage the home, and deal with showings. We offer a direct sale with no fees, no repairs needed, and a guaranteed close date.'
  },
  {
    id: 10,
    question: 'Are you a legitimate company?',
    answer: 'Yes! Nationwide Home Buyers is a fully licensed, bonded, and insured real estate investment company. We\'re BBB accredited with an A+ rating and have been in business for over 15 years. We\'ve helped thousands of homeowners sell their properties.'
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="section bg-secondary-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-semibold text-sm mb-6">
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Questions? We Have Answers
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about selling your house to Nationwide Home Buyers. Still have questions? Give us a call!
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="card overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-secondary-25 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="font-semibold text-secondary-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <ChevronUpIcon className="w-5 h-5 text-primary-600" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </button>

                <div className={cn(
                  'overflow-hidden transition-all duration-300',
                  openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}>
                  <div className="px-6 pb-6 border-t border-secondary-100">
                    <p className="text-secondary-600 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-strong max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-primary-100 mb-6">
              Our friendly team is here to help! Get answers to all your questions and receive your cash offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1-XXX-XXX-XXXX"
                className="btn bg-white text-primary-700 hover:bg-secondary-50 btn-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                📞 Call: (XXX) XXX-XXXX
              </a>
              <button
                onClick={() => {
                  const element = document.getElementById('contact')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn bg-accent-500 text-white hover:bg-accent-600 btn-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                💰 Get Cash Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
