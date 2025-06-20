'use client'

import { useState, useEffect } from 'react'
import { HomeIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

interface FormSubmission {
  id: string
  address: string
  phone?: string
  email?: string
  timestamp: string
  userAgent?: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cash Offer Requests
          </h1>
          <p className="text-gray-600">
            Total submissions: {submissions.length}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No submissions yet
            </h3>
            <p className="text-gray-500">
              Cash offer requests will appear here when customers submit the form.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <HomeIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.address}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {formatDate(submission.timestamp)}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    New Lead
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {submission.phone && (
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <a
                          href={`tel:${submission.phone}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {submission.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {submission.email && (
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {submission.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex space-x-3">
                      <a
                        href={`tel:${submission.phone || '(512) 635-9847'}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      {submission.email && (
                        <a
                          href={`mailto:${submission.email}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      ID: {submission.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            💡 Tip: Access this page anytime
          </h4>
          <p className="text-sm text-blue-700">
            Bookmark this URL: <code className="bg-blue-100 px-2 py-1 rounded">
              {typeof window !== 'undefined' ? window.location.origin : ''}/admin
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
