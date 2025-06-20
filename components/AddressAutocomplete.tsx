'use client'

import { useEffect, useRef, useState, forwardRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string) => void
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
  placeholder?: string
  className?: string
  id?: string
  required?: boolean
  name?: string
  onBlur?: () => void
}

const AddressAutocomplete = forwardRef<HTMLInputElement, AddressAutocompleteProps>(({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter property address...",
  className = "form-input",
  id,
  required = false,
  name,
  onBlur
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setIsLoaded(true) // Mark as loaded so we show the regular input
        return
      }

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        })

        await loader.load()

        // Initialize autocomplete only if input exists
        if (inputRef.current && !autocompleteRef.current) {
          // Use the classic Autocomplete (still supported for existing customers)
          const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'US' }
          })

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            if (place.formatted_address) {
              onChange(place.formatted_address)
              onPlaceSelect?.(place)
            }
          })

          autocompleteRef.current = autocomplete
        }
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setIsLoaded(true) // Still show the input even if Google Maps fails
      }
    }

    loadGoogleMaps()
  }, [onChange, onPlaceSelect])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
      }
    }
  }, [])

  // Update input value when prop changes
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value])

  return (
    <div className="relative">
      <input
        ref={(node) => {
          inputRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        required={required}
        autoComplete="off"
      />

      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="text-xs text-amber-600 mt-1">
          ⚠️ Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local for address autocomplete
        </div>
      )}
    </div>
  )
})

AddressAutocomplete.displayName = 'AddressAutocomplete'

export default AddressAutocomplete
