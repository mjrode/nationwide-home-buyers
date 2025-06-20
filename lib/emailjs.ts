import emailjs from '@emailjs/browser'

interface EmailNotificationData {
    address: string
    phone?: string
    email?: string
    timestamp: string
}

export async function sendEmailNotification(data: EmailNotificationData) {
    // Check if EmailJS is configured
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        console.log('EmailJS not configured - skipping email notification')
        return { success: false, message: 'EmailJS not configured' }
    }

    try {
        // Initialize EmailJS
        emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)

        // Format the timestamp nicely
        const formattedTimestamp = new Date(data.timestamp).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        })

        // Prepare template parameters - simplified version
        const templateParams = {
            address: data.address,
            phone: data.phone || 'Not provided',
            email: data.email || 'Not provided',
            timestamp: formattedTimestamp,
            // Remove the dynamic email variables to avoid corruption
            lead_address: data.address,
            lead_phone: data.phone || 'Not provided',
            lead_email: data.email || 'Not provided',
            submission_time: formattedTimestamp
        }

        // Send email
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            templateParams
        )

        console.log('✅ Email notification sent successfully:', response)
        return { success: true, message: 'Email notification sent' }

    } catch (error) {
        console.error('❌ Failed to send email notification:', error)
        return { success: false, message: 'Failed to send email notification' }
    }
}
