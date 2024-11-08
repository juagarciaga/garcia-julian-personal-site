
import { scriptStatCounter } from "@/components/constants";
import { Footer } from "@/components/footer";
import { Intro } from "@/components/intro";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: scriptStatCounter }} />
      <Navigation activePage='home' />
      <div className="py-4 mx-auto main-container-custom isHome">
        <Intro />
      </div>
      <Footer isHome />
    </main>
  );
}
