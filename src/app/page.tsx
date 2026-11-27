import Hero from "@/components/home/hero"
import Education from "@/components/home/education"
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects"
import Achievements from "@/components/home/achievements"
import HackathonBox from "@/components/home/hackathon-box"
import VianSection from "@/components/home/vian-section";
import Earth from "@/components/home/earth"
import SkillsStack from "@/components/home/skills-stack";
import { BlurFade } from "@/components/ui/blur-fade";
import { getSunsetPhotos } from "@/lib/sunsets";
import { IntroAnimation } from "@/components/ui/intro-animation";
import { ReadingRail } from "@/components/layout/reading-rail";

const BLUR_FADE_DELAY = 0.005;

export default async function Home() {
  const sunsetPhotos = await getSunsetPhotos();

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-x-clip">
      <IntroAnimation />
      <ReadingRail />

      {/* Full-width Hero section so ribbons bleed 100% edge-to-edge of viewport */}
      <BlurFade delay={BLUR_FADE_DELAY} offset={0} inView>
        <section id="hero" className="scroll-mt-16 sm:scroll-mt-24 w-full relative overflow-x-clip pt-16 sm:pt-28 md:pt-36 pb-3 sm:pb-8 flex flex-col items-center justify-start min-h-[auto] md:min-h-screen">
          <Hero />
        </section>
      </BlurFade>

      {/* Main Content Sections - Edge-to-Edge Fluid Layout */}
      <div className="w-full flex flex-col space-y-12 sm:space-y-16 md:space-y-20 px-3 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2} offset={0} inView>
          <section id="dashboard" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <Dashboard />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} offset={0} inView>
          <section id="vian-assistant" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <VianSection />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4} offset={0} inView>
          <section id="education" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <div id="experience" className="scroll-mt-16 sm:scroll-mt-24 w-full">
              <Education />
            </div>
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4.5} offset={0} inView>
          <section id="skills" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <SkillsStack />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5} offset={0} inView>
          <section id="projects" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <Projects />
          </section>
        </BlurFade>
      </div>

      {/* Full-width Achievements Section - Comic Frames Bleed Edge-to-Edge */}
      <BlurFade delay={BLUR_FADE_DELAY * 6} offset={0} inView>
        <section id="achievements" className="scroll-mt-16 sm:scroll-mt-24 w-full relative overflow-x-clip my-8 sm:my-14">
          <Achievements />
          <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12 mt-6 sm:mt-10">
            <HackathonBox />
          </div>
        </section>
      </BlurFade>

      {/* Main Content Sections Continued - Edge-to-Edge */}
      <div className="w-full flex flex-col space-y-12 sm:space-y-16 md:space-y-20 px-3 sm:px-6 md:px-8 lg:px-12 pb-0 sm:pb-4">
        <BlurFade delay={BLUR_FADE_DELAY * 7} offset={0} inView>
          <section id="earth" className="scroll-mt-16 sm:scroll-mt-24 w-full">
            <Earth photos={sunsetPhotos} />
          </section>
        </BlurFade>
      </div>
    </div>
  );
}

