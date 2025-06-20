'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { trackEvent, formatPhoneNumber } from '@/lib/utils'
import AddressAutocomplete from './AddressAutocomplete'

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
  const [showAdvancedFields, setShowAdvancedFields] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ContactFormData>()

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
        setShowAdvancedFields(false)
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
    <section id="contact" className="section bg-gradient-to-br from-secondary-25 via-white to-primary-25">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-success-100 to-success-200 rounded-full text-success-700 font-semibold text-sm mb-6 animate-fade-in hover:scale-105 transition-transform duration-200">
            <CurrencyDollarIcon className="w-4 h-4 mr-2" />
            Get Your Cash Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 animate-slide-up">
            Ready to Sell Your House?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Get your no-obligation cash offer today. Fill out the form below or give us a call - we're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up animation-delay-400">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Get In Touch
              </h3>
              <p className="text-secondary-600 leading-relaxed mb-8">
                Our team of experienced professionals is standing by to help you sell your house quickly and hassle-free.
              </p>
            </div>

            <div className="space-y-6">
              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Phone</h4>
                  <a
                    href="tel:+1-512-635-9847"
                    className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                  >
                    (512) 635-9847
                  </a>
                  <p className="text-sm text-secondary-500">Call for immediate assistance</p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
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

              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
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

              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Service Area</h4>
                  <p className="text-secondary-600">Nationwide Coverage</p>
                  <p className="text-sm text-secondary-500">We buy houses in all 50 states</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-lg">
                <h4 className="font-semibold text-secondary-900 mb-4 text-center">Why Choose Us?</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">5,000+</div>
                    <div className="text-sm text-secondary-600">Happy Sellers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">A+</div>
                    <div className="text-sm text-secondary-600">BBB Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">24hr</div>
                    <div className="text-sm text-secondary-600">Fast Offers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600">15+</div>
                    <div className="text-sm text-secondary-600">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-up animation-delay-600">
            <div className="card p-8 shadow-strong relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full blur-3xl opacity-20 -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-success-100 to-primary-100 rounded-full blur-3xl opacity-20 translate-y-16 -translate-x-16" />

              {!isSubmitted ? (
                <>
                  <div className="mb-8 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                      Get Your Cash Offer
                    </h3>
                    <p className="text-secondary-600">
                      Start with just your address and phone - we'll handle the rest!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Essential Fields */}
                    <div className="space-y-4">
                      {/* Property Address */}
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-2">
                          Property Address *
                        </label>
                        <AddressAutocomplete
                          ref={register('address', {
                            required: 'Property address is required',
                            minLength: { value: 10, message: 'Please enter a complete address' }
                          }).ref}
                          name="address"
                          value={watch('address') || ''}
                          onChange={(address) => setValue('address', address)}
                          onPlaceSelect={(place) => {
                            trackEvent('address_autocomplete_select', {
                              address: place.formatted_address,
                              place_id: place.place_id
                            })
                          }}
                          id="address"
                          placeholder="123 Main St, City, State, ZIP"
                          required
                          className="form-input text-lg"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600 animate-shake">{errors.address.message}</p>
                        )}
                      </div>

                      {/* Phone Number - Required */}
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
                          className="form-input text-lg"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 animate-shake">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Email - Optional but encouraged */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                          Email Address <span className="text-secondary-500">(Recommended)</span>
                        </label>
                        <input
                          {...register('email', {
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          type="email"
                          id="email"
                          placeholder="your@email.com"
                          className="form-input"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 animate-shake">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Optional Details Toggle */}
                    <div className="border-t border-secondary-200 pt-6">
                      <button
                        type="button"
                        onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                        className="flex items-center justify-center w-full text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 mb-4"
                      >
                        <span>{showAdvancedFields ? 'Hide' : 'Show'} Additional Details</span>
                        <svg
                          className={`ml-2 w-4 h-4 transition-transform duration-200 ${showAdvancedFields ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Advanced Fields */}
                      <div className={`space-y-4 transition-all duration-300 ${showAdvancedFields ? 'block' : 'hidden'}`}>
                        {/* Property Type and Timeline */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-secondary-700 mb-2">
                              Property Type
                            </label>
                            <select
                              {...register('propertyType')}
                              id="propertyType"
                              className="form-input"
                            >
                              <option value="">Select property type</option>
                              {propertyTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="timeline" className="block text-sm font-medium text-secondary-700 mb-2">
                              Timeline
                            </label>
                            <select
                              {...register('timeline')}
                              id="timeline"
                              className="form-input"
                            >
                              <option value="">When do you need to sell?</option>
                              {timelines.map(timeline => (
                                <option key={timeline} value={timeline}>{timeline}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Situation */}
                        <div>
                          <label htmlFor="situation" className="block text-sm font-medium text-secondary-700 mb-2">
                            Your Situation
                          </label>
                          <select
                            {...register('situation')}
                            id="situation"
                            className="form-input"
                          >
                            <option value="">What describes your situation?</option>
                            {situations.map(situation => (
                              <option key={situation} value={situation}>{situation}</option>
                            ))}
                          </select>
                        </div>

                        {/* Additional Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                            Additional Details
                          </label>
                          <textarea
                            {...register('message')}
                            id="message"
                            rows={3}
                            placeholder="Tell us more about your property or situation..."
                            className="form-input resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:shadow-lg relative overflow-hidden"
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />

                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Preparing Your Offer...
                        </>
                      ) : (
                        <>
                          💰 Get My Cash Offer Now
                          <span className="ml-2">→</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-secondary-500 flex items-center justify-center space-x-2">
                      <span>🔒</span>
                      <span>Your information is 100% secure and confidential</span>
                    </p>
                    <p className="text-xs text-secondary-400 mt-2">
                      No spam, no pressure, just a fair cash offer in 24 hours
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircleIcon className="w-10 h-10 text-success-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-lg text-secondary-600 mb-6">
                    We've received your information and are preparing your personalized cash offer.
                  </p>
                  <div className="bg-gradient-to-r from-primary-50 to-success-50 border border-primary-200 rounded-xl p-6 mb-6">
                    <p className="text-secondary-700 font-medium mb-2">
                      What happens next?
                    </p>
                    <div className="text-left space-y-2 text-sm text-secondary-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">1</span>
                        </div>
                        <span>Our team reviews your property details</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">2</span>
                        </div>
                        <span>We prepare your personalized cash offer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">3</span>
                        </div>
                        <span>You receive your offer within 24 hours</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                    <p className="text-primary-700 font-medium">
                      Questions? Call us at <a href="tel:+1-512-635-9847" className="font-bold hover:underline">(512) 635-9847</a>
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
