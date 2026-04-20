import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scriptStatCounter } from "@/components/constants"
import PhDScreener from "@/components/phd-screener"

export const metadata = {
  title: 'Julian Garcia · PhD Opportunities',
}

export default function PhDPage() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: scriptStatCounter }} />
      <Navigation activePage="research" />
      <div className="py-4 mx-auto main-container-custom">
        <div className="m-4">
          <h5 className="font-semibold text-gray-800 mb-1">PhD Opportunities</h5>
          <h6 className="text-gray-500 mb-4">Self-Assessment for Prospective Students</h6>
          <PhDScreener />
        </div>
      </div>
      <Footer />
    </main>
  )
}
