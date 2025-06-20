# Component Implementation Patterns

## Navigation Components

### Header Component
```typescript
interface HeaderProps {
  fixed?: boolean
  transparent?: boolean
}

// Sticky behavior with scroll detection
const Header = ({ fixed = true, transparent = false }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)

  useScrollDetection((scrollY) => {
    setScrolled(scrollY > 100)
  })

  return (
    <header className={`
      ${fixed ? 'fixed top-0 w-full z-50' : ''}
      ${transparent && !scrolled ? 'bg-transparent' : 'bg-white shadow-sm'}
      transition-all duration-300
    `}>
      <Navigation />
      <PrimaryCTA />
    </header>
  )
}
```

### Navigation Component
```typescript
interface NavItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
}

const Navigation = () => {
  const [activeSection, setActiveSection] = useActiveSection()

  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', onClick: () => scrollToSection('hero') },
    { id: 'how-it-works', label: 'How It Works', onClick: () => scrollToSection('how-it-works') },
    { id: 'why-us', label: 'Why Us', onClick: () => scrollToSection('why-us') },
    { id: 'faq', label: 'FAQ', href: '/faq' }
  ]

  return (
    <nav>
      {navItems.map(item => (
        <NavLink
          key={item.id}
          active={activeSection === item.id}
          {...item}
        />
      ))}
    </nav>
  )
}
```

## Section Components

### Hero Section Pattern
```typescript
interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaText: string
  onCtaClick: () => void
  backgroundImage?: string
}

const HeroSection = ({ headline, subheadline, ctaText, onCtaClick }: HeroSectionProps) => {
  return (
    <section className="hero-section min-h-screen flex items-center">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">{headline}</h1>
          <p className="text-xl mb-8 text-gray-600">{subheadline}</p>
          <CTAButton size="lg" variant="primary" onClick={onCtaClick}>
            {ctaText}
          </CTAButton>
        </div>
      </Container>
    </section>
  )
}
```

### Value Proposition Sections
```typescript
interface ValuePropSection {
  id: string
  title: string
  description: string
  benefits: string[]
  icon?: string
  reversed?: boolean
}

const ValuePropSection = ({ title, description, benefits, icon, reversed }: ValuePropSection) => {
  return (
    <Section background="light">
      <Container>
        <Grid cols={2} className={reversed ? 'lg:flex-row-reverse' : ''}>
          <div className="content">
            <SectionHeader title={title} description={description} />
            <BenefitsList benefits={benefits} />
          </div>
          <div className="visual">
            {icon && <Icon name={icon} size="xl" />}
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
```

### Process Steps Component
```typescript
interface ProcessStep {
  step: number
  title: string
  description: string
  icon?: string
}

const ProcessSection = () => {
  const steps: ProcessStep[] = [
    {
      step: 1,
      title: "Submit Your Address",
      description: "Submit your address and we'll prepare your offer. Our dedicated team works quickly to prepare your cash offer within 24 hours or less.",
      icon: "home"
    },
    {
      step: 2,
      title: "Receive An Offer In 24 Hours",
      description: "We present you with your cash offer and you choose the close date that works for your schedule.",
      icon: "clock"
    },
    {
      step: 3,
      title: "Get Ready To Close",
      description: "We'll promptly find a local licensed and insured closing company to manage the transaction details for a smooth process.",
      icon: "check"
    }
  ]

  return (
    <Section id="how-it-works" background="dark">
      <Container>
        <SectionHeader
          title="Here's How It Works"
          centered
          light
        />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map(step => (
            <ProcessStepCard key={step.step} {...step} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
```

## Form Components

### Address Submission Form
```typescript
interface AddressFormData {
  address: string
  city?: string
  state?: string
  zip?: string
}

const AddressSubmissionForm = () => {
  const [formData, setFormData] = useState<AddressFormData>({ address: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitLeadForm(formData)
      setSubmitted(true)
      // Track conversion event
      analytics.track('address_submitted', formData)
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return <FormSuccessState />
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Get A Cash Offer For Your Home</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your property address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <CTAButton
        type="submit"
        loading={loading}
        disabled={!formData.address.trim()}
        className="w-full"
      >
        {loading ? 'Preparing Your Offer...' : 'Get My Cash Offer'}
      </CTAButton>

      <p className="text-sm text-gray-500 mt-2">
        No obligation. Get your offer in 24 hours or less.
      </p>
    </form>
  )
}
```

### Multi-Step Form Pattern
```typescript
interface FormStep {
  id: string
  title: string
  fields: FormField[]
  validation?: ValidationSchema
}

const MultiStepForm = ({ steps, onComplete }: { steps: FormStep[], onComplete: (data: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="max-w-md mx-auto">
      <ProgressIndicator current={currentStep} total={steps.length} />

      <FormStepRenderer
        step={steps[currentStep]}
        data={formData}
        onChange={setFormData}
        onNext={nextStep}
        onPrev={prevStep}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
        onComplete={onComplete}
      />
    </div>
  )
}
```

## UI Components

### CTA Button Component
```typescript
interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const CTAButton = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  ...props
}: CTAButtonProps) => {
  const baseClasses = "font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${props.className || ''}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {icon && !loading && <Icon name={icon} className="mr-2" />}
      {children}
    </button>
  )
}
```

### Comparison Table Component
```typescript
interface ComparisonData {
  feature: string
  traditional: string | boolean
  cashBuyer: string | boolean
}

const ComparisonSection = () => {
  const comparisons: ComparisonData[] = [
    { feature: "Risk of buyer financing fall-through", traditional: true, cashBuyer: false },
    { feature: "Hours of prep work and home showings", traditional: true, cashBuyer: false },
    { feature: "Manage repairs yourself", traditional: true, cashBuyer: false },
    { feature: "Uncertain closing timeline", traditional: true, cashBuyer: false },
    { feature: "Competitive cash offer", traditional: false, cashBuyer: "24 hours or less" },
    { feature: "No listing, prep work or showings", traditional: false, cashBuyer: true },
    { feature: "Skip the repair work", traditional: false, cashBuyer: true },
    { feature: "Choose any close date", traditional: false, cashBuyer: "10-60 days" }
  ]

  return (
    <Section background="light">
      <Container>
        <SectionHeader title="Why Selling To Us Is Better" centered />

        <div className="overflow-x-auto mt-8">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-center text-red-600">Traditional Home Sale</th>
                <th className="p-4 text-center text-green-600">Selling To Us</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, index) => (
                <ComparisonRow key={index} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}
```

## Layout Components

### Container Component
```typescript
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  className?: string
}

const Container = ({ size = 'lg', children, className = '' }: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={`
      container mx-auto px-4 sm:px-6 lg:px-8
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </div>
  )
}
```

### Section Component
```typescript
interface SectionProps {
  id?: string
  background?: 'light' | 'dark' | 'accent' | 'transparent'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  className?: string
}

const Section = ({
  id,
  background = 'transparent',
  padding = 'lg',
  children,
  className = ''
}: SectionProps) => {
  const backgroundClasses = {
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    accent: 'bg-blue-600 text-white',
    transparent: 'bg-transparent'
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  }

  return (
    <section
      id={id}
      className={`
        ${backgroundClasses[background]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </section>
  )
}
```

## State Management Patterns

### Form State Hook
```typescript
interface UseFormStateOptions<T> {
  initialData: T
  validation?: ValidationSchema<T>
  onSubmit: (data: T) => Promise<void>
}

const useFormState = <T extends Record<string, any>>({
  initialData,
  validation,
  onSubmit
}: UseFormStateOptions<T>) => {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof T, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    if (!validation) return true

    const validationErrors = validation.validate(data)
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      await onSubmit(data)
      setSubmitted(true)
    } catch (error) {
      // Handle submission error
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    errors,
    loading,
    submitted,
    updateField,
    handleSubmit,
    reset: () => {
      setData(initialData)
      setErrors({})
      setSubmitted(false)
    }
  }
}
```

### Scroll Detection Hook
```typescript
const useScrollDetection = (callback?: (scrollY: number) => void) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)

      callback?.(currentScrollY)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback])

  return { scrollY, scrollDirection }
}
```

## Analytics Integration Patterns

### Event Tracking
```typescript
interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  userId?: string
}

const analytics = {
  track: ({ event, properties, userId }: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event, {
        ...properties,
        user_id: userId
      })
    }

    // Custom analytics
    if (window.customAnalytics) {
      window.customAnalytics.track(event, properties, userId)
    }
  },

  trackFormSubmission: (formType: string, formData: any) => {
    analytics.track({
      event: 'form_submission',
      properties: {
        form_type: formType,
        ...formData
      }
    })
  },

  trackPageView: (page: string) => {
    analytics.track({
      event: 'page_view',
      properties: { page }
    })
  }
}
```
