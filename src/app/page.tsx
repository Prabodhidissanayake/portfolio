"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const Education = dynamic(() => import("@/components/Education"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const BackgroundAnimation = dynamic(
  () => import("@/components/BackgroundAnimation"),
  { ssr: false }
);
const Games = dynamic(() => import("@/components/Games"), { ssr: false });
const InteractiveJourneyMap = dynamic(
  () => import("@/components/InteractiveJourneyMap"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <div className="hidden lg:block">
          <InteractiveJourneyMap />
        </div>
        <div className="lg:hidden px-4 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm italic">
            📱 Check this section using desktop to see a cool video about my dev
            journey
          </p>
        </div>
        <Games />
        <Contact />
      </main>
    </div>
  );
}
