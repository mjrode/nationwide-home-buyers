declare global {
    interface Window {
        gtag?: (...args: any[]) => void
        dataLayer?: any[]
        google?: typeof google
    }
}

// Google Maps API types
declare global {
    namespace google {
        namespace maps {
            class Map {
                constructor(mapDiv: HTMLElement, opts?: MapOptions)
            }

            interface MapOptions {
                center?: LatLng | LatLngLiteral
                zoom?: number
                mapTypeId?: MapTypeId
            }

            class LatLng {
                constructor(lat: number, lng: number)
                lat(): number
                lng(): number
            }

            interface LatLngLiteral {
                lat: number
                lng: number
            }

            enum MapTypeId {
                ROADMAP = 'roadmap',
                SATELLITE = 'satellite',
                HYBRID = 'hybrid',
                TERRAIN = 'terrain'
            }

            namespace places {
                class Autocomplete {
                    constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions)
                    addListener(eventName: string, handler: () => void): void
                    getPlace(): PlaceResult
                }

                interface AutocompleteOptions {
                    types?: string[]
                    componentRestrictions?: ComponentRestrictions
                    fields?: string[]
                }

                interface ComponentRestrictions {
                    country?: string | string[]
                }

                interface PlaceResult {
                    formatted_address?: string
                    formattedAddress?: string
                    place_id?: string
                    placeId?: string
                    geometry?: PlaceGeometry
                    address_components?: AddressComponent[]
                    addressComponents?: AddressComponent[]
                    name?: string
                    types?: string[]
                }

                interface PlaceGeometry {
                    location?: LatLng
                    viewport?: LatLngBounds
                }

                interface AddressComponent {
                    long_name: string
                    short_name: string
                    types: string[]
                }

                class LatLngBounds {
                    constructor(sw?: LatLng, ne?: LatLng)
                }
            }
        }
    }

    interface Window {
        google: typeof google
    }

    // Web Components for the new PlaceAutocompleteElement
    namespace JSX {
        interface IntrinsicElements {
            'gmp-place-autocomplete': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    placeholder?: string
                    country?: string
                    types?: string
                    value?: string
                },
                HTMLElement
            >
        }
    }
}

// Custom event types for the new PlaceAutocompleteElement
declare global {
    interface HTMLElementEventMap {
        'gmp-placeselect': CustomEvent<{
            place: google.maps.places.PlaceResult
        }>
    }
}

export { }
