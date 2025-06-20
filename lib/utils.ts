import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPhoneNumber(value: string): string {
    const phoneNumber = value.replace(/\D/g, '')
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    return phoneRegex.test(phone)
}

export function scrollToElement(elementId: string, offset: number = 80): void {
    const element = document.getElementById(elementId)
    if (element) {
        const elementPosition = element.offsetTop - offset
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        })
    }
}

export function trackEvent(eventName: string, properties?: Record<string, any>): void {
    // Analytics tracking
    if (typeof window !== 'undefined') {
        // Google Analytics 4
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, properties)
        }

        // Custom analytics can be added here
        console.log('Event tracked:', eventName, properties)
    }
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), delay)
        }
    }
}
