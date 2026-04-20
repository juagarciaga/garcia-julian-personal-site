'use client'
import { useState } from 'react'

const RESEARCH_PAPERS = [
  {
    id: 'cooperate-ensembles',
    title: 'Learning to cooperate against ensembles of diverse opponents (2025)',
    venue: 'Neural Computing and Applications',
  },
  {
    id: 'picking-strategies',
    title: 'Picking strategies in games of cooperation (2025)',
    venue: 'PNAS',
  },
  {
    id: 'rational-debate',
    title: 'Cooperative Dilemmas in Rational Debate (2025)',
    venue: 'arXiv preprint',
  },
  {
    id: 'partner-choice',
    title: 'Repeated games with partner choice (2025)',
    venue: 'PLOS Computational Biology',
  },
]

const SUBJECT_CODE = 'GARCIA-PHD-2026'

type FormData = {
  name: string
  studentType: string
  qualification: string
  academicResults: string
  hasThesis: string
  publications: string
  selectedPaper: string
  otherPaper: string
  connectionText: string
}

const INITIAL_FORM: FormData = {
  name: '',
  studentType: '',
  qualification: '',
  academicResults: '',
  hasThesis: '',
  publications: '',
  selectedPaper: '',
  otherPaper: '',
  connectionText: '',
}

function assessProfile(form: FormData): {
  level: 'strong' | 'moderate' | 'developing'
  message: string
} {
  let score = 0
  const isDomestic = form.studentType === 'domestic'

  // Academic results
  if (form.academicResults === '90+') score += 2
  else if (form.academicResults === '80-89') score += 1.5
  else if (form.academicResults === '70-79') score += 0.5

  // Qualification with research component
  if (form.qualification === 'research') score += 1

  // Thesis
  if (form.hasThesis === 'yes') score += 1

  // Publications
  if (form.publications === '3+') score += 3
  else if (form.publications === '1-2') score += 1.5

  if (score >= 4 || (isDomestic && score >= 3)) {
    return {
      level: 'strong',
      message: isDomestic
        ? 'As a domestic student, you are well-positioned for scholarship funding through the Research Training Program (RTP). Your profile looks competitive — I would be happy to hear from you.'
        : 'Your profile looks competitive for a scholarship application. I would be happy to hear from you.',
    }
  }

  if (score >= 2.5 || (isDomestic && score >= 1.5)) {
    return {
      level: 'moderate',
      message: isDomestic
        ? 'As a domestic student, you have access to RTP funding which improves your chances. Your profile shows promise — I encourage you to get in touch, though strengthening your publication record would make your application even stronger.'
        : 'You have relevant experience, though scholarship competition for international students is strong. I encourage you to get in touch, but strengthening your publication record or academic results would improve your chances.',
    }
  }

  return {
    level: 'developing',
    message: isDomestic
      ? 'Your profile could benefit from additional research experience. Consider completing a degree with a research component, or gaining research assistant experience and publishing. Domestic students have access to RTP funding, which helps — but a stronger research track record would make your application more competitive.'
      : 'Scholarship applications at Monash are very competitive, especially for international students. Your profile would benefit from additional research experience before applying. Consider publishing your research, pursuing a degree with a research thesis, or gaining research assistant experience. These steps will significantly improve your competitiveness.',
  }
}

export default function PhDScreener() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const paperSelected =
    form.selectedPaper && (form.selectedPaper !== 'other' || form.otherPaper.trim())

  const canSubmit =
    form.name.trim() &&
    form.studentType &&
    form.qualification &&
    form.academicResults &&
    form.hasThesis &&
    form.publications &&
    paperSelected &&
    form.connectionText.trim().length > 20

  const assessment = assessProfile(form)

  const paperTitle =
    form.selectedPaper === 'other'
      ? form.otherPaper
      : RESEARCH_PAPERS.find((p) => p.id === form.selectedPaper)?.title || ''

  const subjectLine = `PhD Inquiry \u2014 ${form.name.trim()} \u2014 ${SUBJECT_CODE}`

  const qualificationLabel: Record<string, string> = {
    research: 'Degree with research component',
    no_research: 'Degree without research component',
    other: 'Other',
  }

  const emailBody = `Dear Prof. García,

I am writing to express my interest in pursuing a PhD under your supervision. I completed the self-assessment on your website and wanted to reach out.

About me:
- Name: ${form.name.trim()}
- Student type: ${form.studentType === 'domestic' ? 'Domestic (Australian/NZ)' : 'International'}
- Highest qualification: ${qualificationLabel[form.qualification] || form.qualification}

Paper I have read:
${paperTitle}

How my research interests connect to this paper:
${form.connectionText.trim()}

[Please add any additional context about your background and research interests here.]

Best regards,
${form.name.trim()}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(emailBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (submitted) {
    return (
      <div>
        <h5 className="font-semibold text-gray-800 mb-4">Your Profile Assessment</h5>

        <div
          className={`p-4 rounded-lg mb-6 border ${
            assessment.level === 'strong'
              ? 'bg-green-50 border-green-200'
              : assessment.level === 'moderate'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-orange-50 border-orange-200'
          }`}
        >
          <p className="text-sm text-gray-700">{assessment.message}</p>
        </div>

        {(assessment.level === 'strong' || assessment.level === 'moderate') && (
          <>
            <h6 className="font-semibold text-gray-800 mb-2">Next Steps</h6>
            <p className="text-sm text-gray-600 mb-4">
              Send me an email using the subject line and template below. Emails that do not follow
              this format are automatically filtered — please use the exact subject line.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Subject Line (use exactly)
              </label>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm text-gray-800 select-all">
                {subjectLine}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Email Template
              </label>
              <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap font-sans overflow-x-auto">
                {emailBody}
              </pre>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={copyEmail}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Email Template'}
              </button>
              <a
                href={`mailto:julian.garcia@monash.edu?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors no-underline"
              >
                Open in Email Client
              </a>
            </div>
          </>
        )}

        {assessment.level === 'developing' && (
          <div>
            <h6 className="font-semibold text-gray-800 mb-2">Useful Resources</h6>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <a
                  href="https://www.monash.edu/graduate-research/future-students"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Monash Graduate Research — Future Students
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com.au/citations?hl=en&user=nWHuAL4AAAAJ&view_op=list_works&sortby=pubdate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My publications on Google Scholar
                </a>
              </li>
            </ul>
          </div>
        )}

        <button
          onClick={() => {
            setSubmitted(false)
            setCopied(false)
          }}
          className="mt-6 text-sm text-blue-600 underline cursor-pointer bg-transparent border-none"
        >
          &larr; Start over
        </button>
      </div>
    )
  }

  const selectClass =
    'w-full p-2 border rounded text-sm text-gray-700 bg-white appearance-none cursor-pointer'

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm text-gray-600 mb-6">
        I am always happy to hear from potential PhD students. Before getting in touch, please
        complete this short self-assessment — it helps you gauge whether your profile is competitive
        for a funded position, and it generates the email format I need to see your message. Emails
        that do not start with the generated template are filtered automatically.
      </p>

      {/* About You */}
      <div className="mb-4">
        <h6 className="font-semibold text-gray-800 mb-3 pb-1 border-b">About You</h6>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Your name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full p-2 border rounded text-sm text-gray-700"
            placeholder="Full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Are you a domestic or international student?
          </label>
          <select
            value={form.studentType}
            onChange={(e) => update('studentType', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="domestic">Domestic (Australian or NZ citizen/permanent resident)</option>
            <option value="international">International</option>
          </select>
        </div>

        {form.studentType === 'domestic' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700 mb-4">
            Domestic students are generally well-positioned for scholarship funding through the
            Research Training Program (RTP). The questions below still help assess competitiveness,
            but domestic applicants typically face less competition for funding.
          </div>
        )}
      </div>

      {/* Academic Background */}
      <div className="mb-4">
        <h6 className="font-semibold text-gray-800 mb-3 pb-1 border-b">Academic Background</h6>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            What is your highest completed qualification?
          </label>
          <select
            value={form.qualification}
            onChange={(e) => update('qualification', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="research">
              Degree with a research component (Honours, Masters by Research, etc.)
            </option>
            <option value="no_research">Degree without a research component</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            What was your overall final grade or mark?
          </label>
          <p className="text-xs text-gray-500 mb-1">
            This refers to your final cumulative grade, GPA, or mark from your most recent degree.
            Different systems use different scales — please select the closest equivalent. For
            example: Distinction/First Class Honours in the UK/Australian system, or a GPA of 3.7+
            in the US system, would correspond to &ldquo;Outstanding.&rdquo;
          </p>
          <select
            value={form.academicResults}
            onChange={(e) => update('academicResults', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="90+">
              Outstanding (top of cohort, First Class Honours, GPA 3.7+, or ~90%+)
            </option>
            <option value="80-89">
              Very strong (upper second / Distinction, GPA 3.3–3.7, or ~80–89%)
            </option>
            <option value="70-79">Good (lower second / Credit, GPA 2.7–3.3, or ~70–79%)</option>
            <option value="below70">Below the above</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Did your degree include a substantial research thesis?
          </label>
          <select
            value={form.hasThesis}
            onChange={(e) => update('hasThesis', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            How many peer-reviewed publications do you have?
          </label>
          <select
            value={form.publications}
            onChange={(e) => update('publications', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="0">None</option>
            <option value="1-2">1 to 2</option>
            <option value="3+">3 or more</option>
          </select>
        </div>
      </div>

      {/* Research Fit */}
      <div className="mb-4">
        <h6 className="font-semibold text-gray-800 mb-3 pb-1 border-b">Research Fit</h6>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Which of my papers have you read?
          </label>
          <p className="text-xs text-gray-500 mb-1">
            You can find my full publication list on{' '}
            <a
              href="https://scholar.google.com.au/citations?hl=en&user=nWHuAL4AAAAJ&view_op=list_works&sortby=pubdate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </a>
            .
          </p>
          <select
            value={form.selectedPaper}
            onChange={(e) => update('selectedPaper', e.target.value)}
            className={selectClass}
          >
            <option value="">Select a paper...</option>
            {RESEARCH_PAPERS.map((paper) => (
              <option key={paper.id} value={paper.id}>
                {paper.title} — {paper.venue}
              </option>
            ))}
            <option value="other">Another paper not listed here</option>
          </select>
          {form.selectedPaper === 'other' && (
            <input
              type="text"
              value={form.otherPaper}
              onChange={(e) => update('otherPaper', e.target.value)}
              className="w-full p-2 border rounded text-sm text-gray-700 mt-2"
              placeholder="Which paper did you read? (title and year)"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            In a few sentences, describe how your research interests connect to this paper.
          </label>
          <textarea
            value={form.connectionText}
            onChange={(e) => update('connectionText', e.target.value)}
            className="w-full p-2 border rounded text-sm text-gray-700 h-28 resize-y"
            placeholder="What drew you to this paper? How does it relate to your own research interests or experience?"
          />
          {form.connectionText.length > 0 && form.connectionText.trim().length <= 20 && (
            <p className="text-xs text-orange-600 mt-1">Please write at least a few sentences.</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full py-3 rounded text-sm font-semibold transition-colors ${
          canSubmit
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Check My Profile
      </button>
      {!canSubmit && (
        <p className="text-xs text-gray-400 mt-2 text-center">
          Please complete all fields and write a substantive description of your research connection.
        </p>
      )}
    </form>
  )
}
