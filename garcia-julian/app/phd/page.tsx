import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scriptStatCounter } from "@/components/constants"
import PhDScreener from "@/components/phd-screener"

export const metadata = {
  title: 'Julian Garcia · PhD Self-Assessment',
}

export default function PhDPage() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: scriptStatCounter }} />
      <Navigation activePage="join" />
      <div className="py-4 mx-auto main-container-custom">
        <div className="m-4">
          <h2>PhD Self-Assessment</h2>
          <PhDScreener />
        </div>
      </div>
      <Footer />
    </main>
  )
}
