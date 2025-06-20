'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { trackEvent, formatPhoneNumber } from '@/lib/utils'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  propertyType: string
  timeline: string
  situation: string
  message?: string
}

const propertyTypes = [
  'Single Family House',
  'Condominium',
  'Townhouse',
  'Multi-Family Property',
  'Mobile Home',
  'Land/Vacant Lot',
  'Other'
]

const timelines = [
  'ASAP (Within 2 weeks)',
  '1 month',
  '2-3 months',
  '3-6 months',
  'More than 6 months',
  'Just exploring options'
]

const situations = [
  'Need to sell quickly',
  'Property needs repairs',
  'Inherited property',
  'Facing foreclosure',
  'Divorce/separation',
  'Job relocation',
  'Downsizing',
  'Investment property',
  'Other'
]

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    trackEvent('contact_form_submit', data)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Contact form submitted:', data)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        reset()
      }, 8000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const phoneValue = watch('phone')

  return (
    <section id="contact" className="section bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success-100 rounded-full text-success-700 font-semibold text-sm mb-6">
            Get Your Cash Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Ready to Sell Your House?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Get your no-obligation cash offer today. Fill out the form below or give us a call - we're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Get In Touch
              </h3>
              <p className="text-secondary-600 leading-relaxed mb-8">
                Our team of experienced professionals is standing by to help you sell your house quickly and hassle-free.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Phone</h4>
                  <a
                    href="tel:+1-XXX-XXX-XXXX"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    (XXX) XXX-XXXX
                  </a>
                  <p className="text-sm text-secondary-500">Call for immediate assistance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <EnvelopeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Email</h4>
                  <a
                    href="mailto:info@nationwidehomebuyers.com"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    info@nationwidehomebuyers.com
                  </a>
                  <p className="text-sm text-secondary-500">Send us your questions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Business Hours</h4>
                  <div className="text-secondary-600">
                    <p>Mon - Fri: 8AM - 8PM</p>
                    <p>Sat - Sun: 9AM - 6PM</p>
                  </div>
                  <p className="text-sm text-secondary-500">Emergency calls accepted 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Service Area</h4>
                  <p className="text-secondary-600">Nationwide Coverage</p>
                  <p className="text-sm text-secondary-500">We buy houses in all 50 states</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8 shadow-strong">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      Get Your Cash Offer
                    </h3>
                    <p className="text-secondary-600">
                      Provide some details about your property and situation to receive your personalized cash offer.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-2">
                          First Name *
                        </label>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          type="text"
                          id="firstName"
                          placeholder="John"
                          className="form-input"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          type="text"
                          id="lastName"
                          placeholder="Smith"
                          className="form-input"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          type="email"
                          id="email"
                          placeholder="john@example.com"
                          className="form-input"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone', {
                            required: 'Phone number is required',
                            onChange: (e) => {
                              e.target.value = formatPhoneNumber(e.target.value)
                            }
                          })}
                          type="tel"
                          id="phone"
                          placeholder="(555) 123-4567"
                          className="form-input"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Property Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-2">
                        Property Address *
                      </label>
                      <input
                        {...register('address', {
                          required: 'Property address is required',
                          minLength: { value: 10, message: 'Please enter a complete address' }
                        })}
                        type="text"
                        id="address"
                        placeholder="123 Main St, City, State, ZIP"
                        className="form-input"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Property Type and Timeline */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-secondary-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          {...register('propertyType', { required: 'Please select property type' })}
                          id="propertyType"
                          className="form-input"
                        >
                          <option value="">Select property type</option>
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.propertyType && (
                          <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-secondary-700 mb-2">
                          Timeline *
                        </label>
                        <select
                          {...register('timeline', { required: 'Please select timeline' })}
                          id="timeline"
                          className="form-input"
                        >
                          <option value="">When do you need to sell?</option>
                          {timelines.map(timeline => (
                            <option key={timeline} value={timeline}>{timeline}</option>
                          ))}
                        </select>
                        {errors.timeline && (
                          <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Situation */}
                    <div>
                      <label htmlFor="situation" className="block text-sm font-medium text-secondary-700 mb-2">
                        Your Situation *
                      </label>
                      <select
                        {...register('situation', { required: 'Please select your situation' })}
                        id="situation"
                        className="form-input"
                      >
                        <option value="">What describes your situation?</option>
                        {situations.map(situation => (
                          <option key={situation} value={situation}>{situation}</option>
                        ))}
                      </select>
                      {errors.situation && (
                        <p className="mt-1 text-sm text-red-600">{errors.situation.message}</p>
                      )}
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={4}
                        placeholder="Tell us more about your property or situation..."
                        className="form-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Preparing Your Offer...
                        </>
                      ) : (
                        '💰 Get My Cash Offer Now'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-secondary-500">
                      🔒 Your information is 100% secure and confidential
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-10 h-10 text-success-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-lg text-secondary-600 mb-6">
                    We've received your information and are preparing your personalized cash offer.
                  </p>
                  <p className="text-secondary-500 mb-8">
                    Our team will contact you within 24 hours with your offer and next steps.
                  </p>
                  <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                    <p className="text-primary-700 font-medium">
                      Questions? Call us at <a href="tel:+1-XXX-XXX-XXXX" className="font-bold">(XXX) XXX-XXXX</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
