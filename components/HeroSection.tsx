'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircleIcon, ClockIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/solid'
import { trackEvent } from '@/lib/utils'
import AddressAutocomplete from './AddressAutocomplete'
import Image from 'next/image'

interface FormData {
  address: string
  phone?: string
  email?: string
}

const benefits = [
  { icon: ClockIcon, text: 'Cash offer in 24 hours or less' },
  { icon: HomeIcon, text: 'Buy in any condition' },
  { icon: CurrencyDollarIcon, text: 'No fees or commissions' },
  { icon: CheckCircleIcon, text: 'Close on your timeline' },
]

export default function HeroSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    trackEvent('hero_form_submit', { address: data.address })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Form submitted:', data)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        reset()
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-success-500 rounded-full blur-2xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full text-primary-700 font-semibold text-sm mb-6 animate-fade-in">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Trusted by thousands of homeowners nationwide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight animate-slide-up text-balance">
              Sell Your House{' '}
              <span className="gradient-text">Fast for Cash</span>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-600 mb-8 leading-relaxed animate-slide-up animation-delay-200 text-balance">
              Get a competitive cash offer in 24 hours or less. We buy houses in any condition,
              anywhere in the nation. No repairs, no showings, no hassle.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 animate-slide-up animation-delay-400">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 text-secondary-700">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Personal Introduction with Trust Indicators */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 lg:mb-0 animate-slide-up animation-delay-600 border border-primary-100">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary-200 ring-offset-2">
                    <Image
                      src="/images/profile.jpg"
                      alt="Phillip Brown - Nationwide Home Buyers Owner"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircleIcon className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Personal Message */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-secondary-800 font-medium mb-2">
                    "I've been helping homeowners sell their houses quickly and fairly for over 10 years.
                    Every offer is backed by my personal guarantee."
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-4">
                    <div>
                      <p className="font-semibold text-secondary-900">Phillip Brown</p>
                      <p className="text-sm text-secondary-600">Founder & CEO</p>
                    </div>
                    <div className="h-8 w-px bg-secondary-300"></div>
                    <div className="text-sm">
                      <div className="font-semibold text-secondary-900">5,000+ Happy Sellers</div>
                      <div className="text-secondary-600">A+ BBB Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative animate-slide-up animation-delay-800">
            <div className="card p-8 shadow-strong">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                      Get Your Cash Offer Today
                    </h2>
                    <p className="text-secondary-600">
                      Enter your property address below to get started
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        placeholder="(555) 123-4567"
                        className="form-input"
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
                      🔒 No obligation • No spam • 100% confidential
                    </p>
                    <p className="text-xs text-secondary-400 mt-2">
                      By submitting, you agree to our terms and privacy policy
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    We've received your information and will prepare your cash offer within 24 hours.
                  </p>
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/images/profile.jpg"
                        alt="Phillip Brown"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-primary-700 font-medium">
                      Questions? Call us at <a href="tel:+1-512-635-9847" className="font-bold">(512) 635-9847</a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl rotate-12 animate-float opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl -rotate-12 animate-float animation-delay-200 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
