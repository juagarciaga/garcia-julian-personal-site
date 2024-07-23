
import { Footer } from "@/components/footer";
import { Intro } from "@/components/intro";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <Script
        src="https://www.statcounter.com/counter/counter.js"
        strategy="worker"
        id="13020501"
      >
        <div className="statcounter">
          <a title="Web Analytics" href="https://statcounter.com/" target="_blank">
            <Image className="statcounter" src="https://c.statcounter.com/13020501/0/f76d1f72/1/" alt="Web Analytics" referrerPolicy="no-referrer-when-downgrade" />
          </a>
        </div>
      </Script>
      <Navigation activePage='home' />
      <div className="py-4 mx-auto main-container-custom isHome">
        <Intro />
      </div>
      <Footer isHome />
    </main>
  );
}
