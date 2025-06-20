import { NextResponse } from 'next/server'
import { getSubmissions, getSubmissionCount } from '@/lib/submissions'

export async function GET() {
    try {
        const submissions = getSubmissions()
        const count = getSubmissionCount()

        return NextResponse.json({
            submissions,
            count,
            message: `Found ${count} submissions`
        })
    } catch (error) {
        console.error('Error fetching submissions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch submissions' },
            { status: 500 }
        )
    }
}
