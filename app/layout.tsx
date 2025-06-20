import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nationwide Home Buyers - We Buy Houses for Cash in Any Condition',
  description: 'Get a cash offer for your home in 24 hours or less. We buy houses in any condition nationwide. No repairs, no showings, no hassle. Family-owned and trusted.',
  keywords: 'sell house fast, cash for houses, we buy houses, sell home quickly, cash home buyers, nationwide home buyers',
  authors: [{ name: 'Nationwide Home Buyers' }],
  creator: 'Nationwide Home Buyers',
  publisher: 'Nationwide Home Buyers',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nationwidehomebuyers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Nationwide Home Buyers - We Buy Houses for Cash',
    description: 'Get a cash offer for your home in 24 hours or less. We buy houses in any condition nationwide.',
    siteName: 'Nationwide Home Buyers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nationwide Home Buyers - Cash for Houses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nationwide Home Buyers - We Buy Houses for Cash',
    description: 'Get a cash offer for your home in 24 hours or less.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Nationwide Home Buyers',
              description: 'We buy houses in any condition for cash nationwide',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nationwidehomebuyers.com',
              telephone: '+1-512-635-9847',
              areaServed: 'United States',
              serviceType: 'House Buying Service',
              offers: {
                '@type': 'Offer',
                description: 'Cash offers for houses in 24 hours',
                price: 'Competitive cash offers',
                availability: 'Available nationwide'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-secondary-900 antialiased">
        {children}
      </body>
    </html>
  )
}
