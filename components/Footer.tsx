'use client'

import Link from 'next/link'
import {
  HomeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon
} from '@heroicons/react/24/outline'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Our Process', href: '#benefits' },
    { name: 'Testimonials', href: '#testimonials' },
  ],
  services: [
    { name: 'Sell Your House Fast', href: '#hero' },
    { name: 'Cash Home Buyers', href: '#contact' },
    { name: 'We Buy Houses As-Is', href: '#benefits' },
    { name: 'Avoid Foreclosure', href: '#faq' },
  ],
  resources: [
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Market Updates', href: '/market-updates' },
    { name: 'Selling Tips', href: '/selling-tips' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Sitemap', href: '/sitemap' },
  ]
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: FacebookIcon },
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nationwide Home Buyers</span>
            </div>

            <p className="text-secondary-300 mb-6 leading-relaxed">
              America's trusted cash home buyers. We've been helping homeowners sell their houses quickly and hassle-free for over 15 years.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-primary-400" />
                <a href="tel:+1-XXX-XXX-XXXX" className="text-secondary-300 hover:text-white transition-colors">
                  (XXX) XXX-XXXX
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-primary-400" />
                <a href="mailto:info@nationwidehomebuyers.com" className="text-secondary-300 hover:text-white transition-colors">
                  info@nationwidehomebuyers.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5" />
                <div className="text-secondary-300">
                  <p>Nationwide Coverage</p>
                  <p className="text-sm">All 50 States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 pt-8 border-t border-secondary-700">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Sell Your House?</h3>
            <p className="text-primary-100 mb-6">Get your no-obligation cash offer in 24 hours or less.</p>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn bg-white text-primary-700 hover:bg-secondary-50 btn-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              💰 Get My Cash Offer Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary-700">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {currentYear} Nationwide Home Buyers. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-secondary-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="text-secondary-400 text-sm">
              Licensed • Bonded • Insured
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-secondary-950 border-t border-secondary-800">
        <div className="container py-4">
          <p className="text-secondary-500 text-xs text-center leading-relaxed">
            Nationwide Home Buyers is a real estate investment company. We are not real estate agents or brokers.
            All offers are made directly by Nationwide Home Buyers and are subject to property inspection and verification of ownership.
            Offers may vary based on property condition, location, and market factors.
            This website and its content are for informational purposes only and do not constitute legal, financial, or real estate advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
