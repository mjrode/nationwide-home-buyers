import { NextRequest, NextResponse } from 'next/server'
import { addSubmission } from '@/lib/submissions'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { address, phone, email } = body

        // Basic validation
        if (!address) {
            return NextResponse.json(
                { error: 'Address is required' },
                { status: 400 }
            )
        }

        const timestamp = new Date().toISOString()

        // Store the submission
        const submission = addSubmission({
            address,
            phone,
            email,
            timestamp,
            userAgent: request.headers.get('user-agent') || undefined,
        })

        // Log to console for immediate visibility
        console.log('🏠 New Cash Offer Request:', submission)

        // Email notification is handled on the client side via EmailJS

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({
            success: true,
            message: 'Thank you! We\'ll prepare your cash offer within 24 hours.',
        })

    } catch (error) {
        console.error('Form submission error:', error)
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        )
    }
}
