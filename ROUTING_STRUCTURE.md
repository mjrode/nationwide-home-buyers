# Routing & Navigation Structure

## Routing Architecture

### Primary Routes
```typescript
// Main application routes
const routes = [
  {
    path: '/',
    component: LandingPage,
    exact: true
  },
  {
    path: '/how-it-works',
    component: HowItWorksPage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/contact',
    component: ContactPage
  },
  {
    path: '/faq',
    component: FAQPage
  },
  {
    path: '/privacy',
    component: PrivacyPage
  },
  {
    path: '/terms',
    component: TermsPage
  }
]
```

### Section-Based Navigation (Single Page)
```typescript
// Landing page sections with hash routing
const landingSections = [
  { id: 'hero', label: 'Home', hash: '#hero' },
  { id: 'benefits', label: 'Benefits', hash: '#benefits' },
  { id: 'how-it-works', label: 'How It Works', hash: '#how-it-works' },
  { id: 'comparison', label: 'Why Us', hash: '#comparison' },
  { id: 'testimonials', label: 'Reviews', hash: '#testimonials' },
  { id: 'contact', label: 'Contact', hash: '#contact' }
]
```

## Navigation Components

### Main Navigation Hook
```typescript
const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolling, setIsScrolling] = useState(false)

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setIsScrolling(true)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Update hash without triggering scroll
      window.history.pushState(null, '', `#${sectionId}`)

      setTimeout(() => setIsScrolling(false), 1000)
    }
  }, [])

  // Track active section on scroll
  useEffect(() => {
    if (isScrolling) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id)
            window.history.replaceState(null, '', `#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-100px 0px' }
    )

    landingSections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isScrolling])

  return {
    activeSection,
    scrollToSection,
    isScrolling
  }
}
```

### Responsive Navigation Component
```typescript
const MainNavigation = () => {
  const { activeSection, scrollToSection } = useNavigation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  useScrollDetection((scrollY) => {
    setHeaderFixed(scrollY > 100)
  })

  return (
    <nav className={`
      transition-all duration-300
      ${headerFixed ? 'fixed top-0 w-full bg-white shadow-lg z-50' : 'relative bg-transparent'}
    `}>
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {landingSections.map(section => (
              <NavLink
                key={section.id}
                active={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  font-medium transition-colors duration-200
                  ${activeSection === section.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                {section.label}
              </NavLink>
            ))}
            <CTAButton size="sm" variant="primary">
              Get Offer
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <MenuIcon className={mobileMenuOpen ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          sections={landingSections}
          activeSection={activeSection}
          onSectionClick={(sectionId) => {
            scrollToSection(sectionId)
            setMobileMenuOpen(false)
          }}
        />
      </Container>
    </nav>
  )
}
```

### Mobile Menu Component
```typescript
interface MobileMenuProps {
  isOpen: boolean
  sections: Array<{id: string, label: string}>
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

const MobileMenu = ({ isOpen, sections, activeSection, onSectionClick }: MobileMenuProps) => {
  return (
    <div className={`
      md:hidden overflow-hidden transition-all duration-300
      ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
    `}>
      <div className="py-4 space-y-2 border-t border-gray-200">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`
              block w-full text-left px-4 py-2 rounded-md font-medium
              ${activeSection === section.id
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {section.label}
          </button>
        ))}
        <div className="pt-2">
          <CTAButton className="w-full" variant="primary">
            Get My Cash Offer
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
```

## Page Structure & Layout

### Landing Page Layout
```typescript
const LandingPage = () => {
  return (
    <div className="landing-page">
      <MainNavigation />

      <main>
        <HeroSection id="hero" />
        <BenefitsSection id="benefits" />
        <ProcessSection id="how-it-works" />
        <ComparisonSection id="comparison" />
        <TestimonialsSection id="testimonials" />
        <ContactSection id="contact" />
      </main>

      <Footer />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Exit Intent Modal */}
      <ExitIntentModal />
    </div>
  )
}
```

### Page Transition Patterns
```typescript
const usePageTransitions = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionTo = useCallback((path: string) => {
    setIsTransitioning(true)

    // Smooth transition effect
    setTimeout(() => {
      window.location.href = path
    }, 300)
  }, [])

  return { isTransitioning, transitionTo }
}

// Page wrapper with transition
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isTransitioning } = usePageTransitions()

  return (
    <div className={`
      transition-opacity duration-300
      ${isTransitioning ? 'opacity-0' : 'opacity-100'}
    `}>
      {children}
    </div>
  )
}
```

## URL Management & SEO

### Dynamic Meta Tags
```typescript
interface PageMeta {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
}

const useDynamicMeta = (meta: PageMeta) => {
  useEffect(() => {
    // Update title
    document.title = meta.title

    // Update meta tags
    const metaTags = [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords || '' },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.ogImage || '/default-og-image.jpg' }
    ]

    metaTags.forEach(tag => {
      const element = document.querySelector(`meta[name="${tag.name}"], meta[property="${tag.property}"]`)
      if (element) {
        element.setAttribute('content', tag.content)
      }
    })

    // Update canonical URL
    if (meta.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', meta.canonicalUrl)
    }
  }, [meta])
}
```

### Section-Based Schema Markup
```typescript
const useSchemaMarkup = () => {
  useEffect(() => {
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "National Property Buyer",
      "description": "We buy houses in any condition for cash",
      "url": window.location.origin,
      "telephone": "+1-512-635-9847",
      "areaServed": "United States",
      "serviceType": "House Buying Service",
      "offers": {
        "@type": "Offer",
        "description": "Cash offers for houses in 24 hours",
        "price": "Competitive cash offers",
        "availability": "Available nationwide"
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(businessSchema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])
}
```

## Floating & Sticky Elements

### Floating CTA Button
```typescript
const FloatingCTA = () => {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScrollDetection()

  useEffect(() => {
    // Show after scrolling past hero section
    setVisible(scrollY > window.innerHeight * 0.8)
  }, [scrollY])

  return (
    <div className={`
      fixed bottom-6 right-6 z-40 transition-all duration-300
      ${visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
    `}>
      <CTAButton
        size="lg"
        variant="primary"
        className="shadow-2xl animate-pulse"
        onClick={() => scrollToSection('contact')}
      >
        💰 Get Cash Offer
      </CTAButton>
    </div>
  )
}
```

### Progress Indicator
```typescript
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useScrollDetection((scrollY) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = (scrollY / totalHeight) * 100
    setProgress(Math.min(scrollProgress, 100))
  })

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

## Deep Linking & State Management

### URL State Synchronization
```typescript
const useUrlState = () => {
  const [urlState, setUrlState] = useState({
    section: 'hero',
    formStep: 0,
    modalOpen: false
  })

  // Parse URL parameters and hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const urlParams = new URLSearchParams(window.location.search)

    setUrlState({
      section: hash || 'hero',
      formStep: parseInt(urlParams.get('step') || '0'),
      modalOpen: urlParams.get('modal') === 'true'
    })
  }, [])

  // Update URL when state changes
  const updateUrlState = useCallback((newState: Partial<typeof urlState>) => {
    const updatedState = { ...urlState, ...newState }
    setUrlState(updatedState)

    // Update URL without page refresh
    const url = new URL(window.location.href)
    url.hash = updatedState.section

    if (updatedState.formStep > 0) {
      url.searchParams.set('step', updatedState.formStep.toString())
    } else {
      url.searchParams.delete('step')
    }

    if (updatedState.modalOpen) {
      url.searchParams.set('modal', 'true')
    } else {
      url.searchParams.delete('modal')
    }

    window.history.replaceState({}, '', url.toString())
  }, [urlState])

  return { urlState, updateUrlState }
}
```

### Back Button Handling
```typescript
const useBackButtonHandling = () => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Handle back/forward navigation
      const hash = window.location.hash.slice(1)

      if (hash) {
        scrollToSection(hash)
      } else {
        // Close modals, reset forms, etc.
        window.dispatchEvent(new CustomEvent('backButtonPressed'))
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
}
```

## Error Boundaries & Fallbacks

### Route Error Boundary
```typescript
const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            Don't worry, you can still get your cash offer!
          </p>
          <CTAButton onClick={() => window.location.href = '/#contact'}>
            Get Your Offer Now
          </CTAButton>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
```
