import { useState } from 'react'

interface FormData {
  // Section 1
  name: string
  email: string
  projectType: string
  completionDate: string
  // Section 2
  overallQuality: number
  craftsmanship: number
  metExpectations: number
  durabilityFunctionality: number
  aesthetics: number
  loveMost: string
  wouldChange: string
  // Section 3
  communicationClarity: number
  understoodVision: number
  designCollaboration: number
  updatesTransparency: number
  timelineManagement: number
  experienceStandout: string
  // Section 4
  valueForInvestment: number
  professionalExperience: number
  npsScore: number | null
  // Section 5
  howItMakesYouFeel: string
  changedRoomUse: string
  problemSolved: string
  biggestConcern: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  projectType: '',
  completionDate: '',
  overallQuality: 0,
  craftsmanship: 0,
  metExpectations: 0,
  durabilityFunctionality: 0,
  aesthetics: 0,
  loveMost: '',
  wouldChange: '',
  communicationClarity: 0,
  understoodVision: 0,
  designCollaboration: 0,
  updatesTransparency: 0,
  timelineManagement: 0,
  experienceStandout: '',
  valueForInvestment: 0,
  professionalExperience: 0,
  npsScore: null,
  howItMakesYouFeel: '',
  changedRoomUse: '',
  problemSolved: '',
  biggestConcern: '',
}

function StarRating({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`text-2xl transition-colors focus:outline-none ${
              star <= (hovered || value) ? 'text-amber-400' : 'text-gray-300'
            }`}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm text-gray-500 self-center">{value}/5</span>
        )}
      </div>
    </div>
  )
}

function NpsRating({
  value,
  onChange,
}: {
  value: number | null
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        How likely are you to recommend us to friends or family?{' '}
        <span className="text-gray-400 font-normal">(0–10 scale)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 11 }, (_, i) => i).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-10 h-10 rounded-full text-sm font-semibold border-2 transition-colors focus:outline-none ${
              value === n
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-gray-300 text-gray-600 hover:border-amber-400'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        <span>Not likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  )
}

function SectionCard({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
          {number}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function TextInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
      />
    </div>
  )
}

function TextArea({
  label,
  name,
  value,
  onChange,
  optional,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  optional?: boolean
  placeholder?: string
}) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {optional && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
      />
    </div>
  )
}

function buildAIPrompt(data: FormData): string {
  const optionalLines: string[] = []
  if (data.howItMakesYouFeel)
    optionalLines.push(`When they see the piece in their space, it makes them feel: ${data.howItMakesYouFeel}.`)
  if (data.changedRoomUse)
    optionalLines.push(`It has changed how they use or enjoy the room: ${data.changedRoomUse}.`)
  if (data.problemSolved)
    optionalLines.push(`The project solved this problem for them: ${data.problemSolved}.`)

  return `Write a Google review for a Cache Custom, a custom woodworking studio in Logan, Utah. Only write the content of the review, not the rating itself.
Client's project description: ${data.projectType}.
They rated overall satisfaction as ${data.overallQuality}/5.
They loved: ${data.loveMost || 'the finished piece'}.
Their biggest concern was: ${data.biggestConcern || 'not specified'}.
What stood out about their service: ${data.experienceStandout || 'the overall experience'}.
${optionalLines.join('\n')}
Tone: Authentic, specific, and not overly salesy. Stay true to the client's voice and experience.`
}

export default function App() {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [aiReview, setAiReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const fillSampleData = () => {
    setForm({
      name: 'John Smith',
      email: 'john.smith@example.com',
      projectType: 'dining table',
      completionDate: '2026-02-15',
      overallQuality: 5,
      craftsmanship: 5,
      metExpectations: 5,
      durabilityFunctionality: 5,
      aesthetics: 5,
      loveMost: 'The attention to detail and beautiful wood grain. The custom design fits perfectly in our dining room.',
      wouldChange: 'Nothing at all - it exceeded our expectations!',
      communicationClarity: 5,
      understoodVision: 5,
      designCollaboration: 5,
      updatesTransparency: 5,
      timelineManagement: 4,
      experienceStandout: 'The team was incredibly professional and took time to understand exactly what we wanted. They provided regular updates with photos throughout the process.',
      valueForInvestment: 5,
      professionalExperience: 5,
      npsScore: 10,
      howItMakesYouFeel: 'Proud and excited every time we have guests over. It\'s become the centerpiece of our home.',
      changedRoomUse: 'We now host dinner parties much more often because we have such a beautiful space to gather around.',
      problemSolved: 'We needed a table that could accommodate our large family while also fitting the unique dimensions of our dining room.',
      biggestConcern: 'I was worried about the timeline and whether the final product would match my vision, but both concerns were completely resolved.',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const prompt = buildAIPrompt(form)
      
      // Call the Vercel serverless function
      const response = await fetch('/api/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate review')
      }

      const data = await response.json()
      setAiReview(data.review)
    } catch (err) {
      setError('Failed to generate AI review. Please try again.')
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Thank You!</h1>
            <p className="text-gray-500">We truly appreciate your feedback.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                6
              </div>
              <h2 className="text-lg font-semibold text-gray-800">AI Review Generator</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              We'd really appreciate you posting your thoughts on Google Review. Here is a
              suggestion based on your responses:
            </p>

            {loading && (
              <div className="flex items-center gap-2 text-amber-600 mb-4">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating your review…
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {aiReview && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-gray-800 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {aiReview}
              </div>
            )}

            <a
              href="https://search.google.com/local/writereview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" />
              </svg>
              Leave a Google Review
            </a>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setForm(initialFormData)
                setSubmitted(false)
                setAiReview('')
                setError('')
              }}
              className="text-sm text-gray-400 hover:text-gray-600 underline"
            >
              Submit another response
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Client Feedback</h1>
          <p className="text-gray-500 text-sm">
            Thank you for choosing us for your custom woodworking project.
            <br />
            We'd love to hear about your experience.
          </p>
        </div>

        {/* Sample Data Button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={fillSampleData}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium underline focus:outline-none"
          >
            Fill with Sample Data
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Project Information */}
          <SectionCard number={1} title="Project Information">
            <TextInput
              label="Name"
              name="name"
              value={form.name}
              onChange={(v) => set('name', v)}
              required
              placeholder="Your full name"
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => set('email', v)}
              required
              placeholder="you@example.com"
            />
            <div className="mb-5">
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                id="projectType"
                value={form.projectType}
                onChange={(e) => set('projectType', e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              >
                <option value="">Select a project type…</option>
                <option value="dining table">Dining Table</option>
                <option value="built-in shelving">Built-in Shelving</option>
                <option value="cabinetry">Cabinetry</option>
                <option value="outdoor furniture">Outdoor Furniture</option>
                <option value="desk or office furniture">Desk / Office Furniture</option>
                <option value="bed frame">Bed Frame</option>
                <option value="entertainment center">Entertainment Center</option>
                <option value="other custom woodworking">Other</option>
              </select>
            </div>
            <TextInput
              label="Project Completion Date"
              name="completionDate"
              type="date"
              value={form.completionDate}
              onChange={(v) => set('completionDate', v)}
              required
            />
          </SectionCard>

          {/* Section 2: Product Satisfaction */}
          <SectionCard number={2} title="Product Satisfaction">
            <p className="text-xs text-gray-400 mb-4">1 = Very Dissatisfied, 5 = Extremely Satisfied</p>
            <StarRating
              label="How satisfied are you with the overall quality of the finished piece?"
              value={form.overallQuality}
              onChange={(v) => set('overallQuality', v)}
            />
            <StarRating
              label="How satisfied are you with the craftsmanship and attention to detail?"
              value={form.craftsmanship}
              onChange={(v) => set('craftsmanship', v)}
            />
            <StarRating
              label="Did the finished product meet your expectations?"
              value={form.metExpectations}
              onChange={(v) => set('metExpectations', v)}
            />
            <StarRating
              label="How satisfied are you with the durability and functionality?"
              value={form.durabilityFunctionality}
              onChange={(v) => set('durabilityFunctionality', v)}
            />
            <StarRating
              label="How satisfied are you with the aesthetics/design?"
              value={form.aesthetics}
              onChange={(v) => set('aesthetics', v)}
            />
            <hr className="my-5 border-gray-100" />
            <TextArea
              label="What do you love most about your finished piece?"
              name="loveMost"
              value={form.loveMost}
              onChange={(v) => set('loveMost', v)}
              optional
              placeholder="Tell us what you enjoy most…"
            />
            <TextArea
              label="Is there anything you would change or improve?"
              name="wouldChange"
              value={form.wouldChange}
              onChange={(v) => set('wouldChange', v)}
              optional
              placeholder="Any suggestions are welcome…"
            />
          </SectionCard>

          {/* Section 3: Design & Communication Process */}
          <SectionCard number={3} title="Design & Communication Process">
            <p className="text-xs text-gray-400 mb-4">1 = Very Dissatisfied, 5 = Extremely Satisfied</p>
            <StarRating
              label="How clear and responsive was communication throughout the project?"
              value={form.communicationClarity}
              onChange={(v) => set('communicationClarity', v)}
            />
            <StarRating
              label="How well did we understand your vision?"
              value={form.understoodVision}
              onChange={(v) => set('understoodVision', v)}
            />
            <StarRating
              label="How satisfied were you with the design collaboration process?"
              value={form.designCollaboration}
              onChange={(v) => set('designCollaboration', v)}
            />
            <StarRating
              label="How satisfied were you with updates and transparency?"
              value={form.updatesTransparency}
              onChange={(v) => set('updatesTransparency', v)}
            />
            <StarRating
              label="How satisfied were you with timeline management?"
              value={form.timelineManagement}
              onChange={(v) => set('timelineManagement', v)}
            />
            <hr className="my-5 border-gray-100" />
            <TextArea
              label="What stood out about the experience of working with us?"
              name="experienceStandout"
              value={form.experienceStandout}
              onChange={(v) => set('experienceStandout', v)}
              placeholder="Share what made the experience memorable…"
            />
          </SectionCard>

          {/* Section 4: Value & Professionalism */}
          <SectionCard number={4} title="Value & Professionalism">
            <p className="text-xs text-gray-400 mb-4">1 = Very Dissatisfied, 5 = Extremely Satisfied</p>
            <StarRating
              label="How would you rate the value for the investment?"
              value={form.valueForInvestment}
              onChange={(v) => set('valueForInvestment', v)}
            />
            <StarRating
              label="How professional was the overall experience?"
              value={form.professionalExperience}
              onChange={(v) => set('professionalExperience', v)}
            />
            <hr className="my-5 border-gray-100" />
            <NpsRating value={form.npsScore} onChange={(v) => set('npsScore', v)} />
          </SectionCard>

          {/* Section 5: Optional AI Questions */}
          <SectionCard number={5} title="A Few More Questions (Optional)">
            <p className="text-xs text-gray-500 mb-4">
              These responses help us craft a more personalized review suggestion for you.
            </p>
            <TextArea
              label="How does this piece make you feel when you see it in your space?"
              name="howItMakesYouFeel"
              value={form.howItMakesYouFeel}
              onChange={(v) => set('howItMakesYouFeel', v)}
              optional
              placeholder="e.g., proud, cozy, impressed…"
            />
            <TextArea
              label="Has it changed how you use or enjoy the room?"
              name="changedRoomUse"
              value={form.changedRoomUse}
              onChange={(v) => set('changedRoomUse', v)}
              optional
              placeholder="Describe any changes in how you use the space…"
            />
            <TextArea
              label="What problem did this project solve for you?"
              name="problemSolved"
              value={form.problemSolved}
              onChange={(v) => set('problemSolved', v)}
              optional
              placeholder="e.g., needed more storage, wanted a statement piece…"
            />
            <TextArea
              label="What was your biggest concern before starting? Was it resolved?"
              name="biggestConcern"
              value={form.biggestConcern}
              onChange={(v) => set('biggestConcern', v)}
              optional
              placeholder="e.g., worried about timeline, quality, cost…"
            />
          </SectionCard>

          {/* Submit */}
          <div className="flex justify-center mb-10">
            <button
              type="submit"
              disabled={loading}
              className={`font-semibold py-3 px-12 rounded-xl text-base transition-colors shadow-sm flex items-center gap-2 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white'
              }`}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
