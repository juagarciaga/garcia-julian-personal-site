import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scriptStatCounter } from "@/components/constants"
import PublicationsHighlights from "@/components/publications-highlights"
import fs from "fs"

export const metadata = {
  title: 'Julian Garcia · Papers',
}

function getHighlights() {
  const data = fs.readFileSync('content/publications-highlights.json', 'utf8')
  return JSON.parse(data)
}

export default function PublicationsPage() {
  const data = getHighlights()

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: scriptStatCounter }} />
      <Navigation activePage="papers" />
      <div className="py-4 mx-auto main-container-custom">
        <div className="m-4">
          <h2>Papers</h2>
          <PublicationsHighlights data={data} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
