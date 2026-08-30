import Hero from "@/components/home/hero"
import Experience from "@/components/home/experience"
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects"
import Achievements from "@/components/home/achievements"
import HackathonBox from "@/components/home/hackathon-box"
import VianSection from "@/components/home/vian-section";
import Earth from "@/components/home/earth"
import { BlurFade } from "@/components/ui/blur-fade";
import { getSunsetPhotos } from "@/lib/sunsets";
import { IntroAnimation } from "@/components/ui/intro-animation";

const BLUR_FADE_DELAY = 0.005;

export default async function Home() {
  const sunsetPhotos = await getSunsetPhotos();

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-clip">
      <IntroAnimation />

      {/* Full-width Hero section so ribbons bleed 100% edge-to-edge of viewport */}
      <BlurFade delay={BLUR_FADE_DELAY} offset={0} inView>
        <section id="hero" className="scroll-mt-24 sm:scroll-mt-28 w-full relative overflow-x-clip sm:min-h-screen flex items-center justify-center">
          <Hero />
        </section>
      </BlurFade>

      {/* Main Content Sections */}
      <div className="mx-auto flex max-w-5xl flex-col space-y-12 sm:space-y-20 px-4 pt-8 sm:pt-16">
        <BlurFade delay={BLUR_FADE_DELAY * 2} offset={0} inView>
          <section id="dashboard" className="scroll-mt-24 sm:scroll-mt-28">
            <Dashboard />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} offset={0} inView>
          <section id="vian-assistant" className="scroll-mt-24 sm:scroll-mt-28">
            <VianSection />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4} offset={0} inView>
          <section id="experience" className="scroll-mt-24 sm:scroll-mt-28">
            <Experience />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5} offset={0} inView>
          <section id="projects" className="scroll-mt-24 sm:scroll-mt-28">
            <Projects />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 6} offset={0} inView>
          <section id="achievements" className="scroll-mt-24 sm:scroll-mt-28 space-y-8">
            <Achievements />
            <HackathonBox />
          </section>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 7} offset={0} inView>
          <section id="earth" className="scroll-mt-24 sm:scroll-mt-28">
            <Earth photos={sunsetPhotos} />
          </section>
        </BlurFade>
      </div>
    </div>
  );
}

