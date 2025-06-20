export interface FormSubmission {
    id: string
    address: string
    phone?: string
    email?: string
    timestamp: string
    userAgent?: string
}

// Simple in-memory storage (in production, you'd use a database)
let submissions: FormSubmission[] = []

export function addSubmission(submission: Omit<FormSubmission, 'id'>): FormSubmission {
    const newSubmission: FormSubmission = {
        id: Math.random().toString(36).substr(2, 9),
        ...submission,
    }

    submissions.unshift(newSubmission) // Add to beginning of array

    // Keep only last 100 submissions to prevent memory issues
    if (submissions.length > 100) {
        submissions = submissions.slice(0, 100)
    }

    return newSubmission
}

export function getSubmissions(): FormSubmission[] {
    return submissions
}

export function getSubmissionCount(): number {
    return submissions.length
}
