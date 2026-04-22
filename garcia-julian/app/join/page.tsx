import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scriptStatCounter } from "@/components/constants"
import Link from "next/link"

export const metadata = {
  title: 'Julian Garcia · Join Us',
}

export default function JoinPage() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: scriptStatCounter }} />
      <Navigation activePage="join" />
      <div className="py-4 mx-auto main-container-custom">
        <div className="m-4">
          <h2>Join Us</h2>

          <h3>🍎 Honours Students</h3>
          <p className="text-sm text-gray-600 mb-4">
            I supervise Honours projects related to my <Link href="/research">research themes</Link> —
            game theory, multi-agent systems, and computational modelling. If you are a Monash
            student interested in an Honours project, feel free to get in touch by email.
          </p>

          <h3>☀️ Summer & Winter Scholarships</h3>
          <p className="text-sm text-gray-600 mb-6">
            Monash offers <a href="https://www.monash.edu/study/fees-scholarships/scholarships/summer-winter" target="_blank" rel="noopener noreferrer">summer and winter research scholarships</a> for
            undergraduate students. These are a great way to get a taste of research. If you are
            interested in working with me on a short project, check the deadlines and get in touch.
          </p>

          <hr className="my-6" />

          <h3>🎓 PhD Opportunities</h3>
          <p className="text-sm text-gray-600 mb-4">
            I am always happy to hear from potential PhD students. If you are interested in pursuing
            a PhD under my supervision, please complete the{' '}
            <Link href="/phd">PhD self-assessment</Link> — it helps you gauge whether your profile is
            competitive for a funded position and generates the email format I need to see your
            message.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
