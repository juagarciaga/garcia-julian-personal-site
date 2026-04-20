import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scriptStatCounter } from "@/components/constants"
import PhDScreener from "@/components/phd-screener"

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
            I supervise Honours projects related to my <a href="/research">research themes</a> —
            game theory, multi-agent systems, and computational modelling. If you are a Monash
            student interested in an Honours project, feel free to get in touch by email.
          </p>

          <h3>☀️ Summer & Winter Scholarships</h3>
          <p className="text-sm text-gray-600 mb-6">
            Monash offers <a href="https://www.monash.edu/it/about-us/summer-winter-research" target="_blank" rel="noopener noreferrer">summer and winter research scholarships</a> for
            undergraduate students. These are a great way to get a taste of research. If you are
            interested in working with me on a short project, check the deadlines and get in touch.
          </p>

          <hr className="my-6" />

          <h3>🎓 PhD Opportunities</h3>
          <PhDScreener />
        </div>
      </div>
      <Footer />
    </main>
  )
}
