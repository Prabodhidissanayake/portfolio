"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <InteractiveJourneyMap />
        <Games />
        <Contact />
      </main>
    </div>
  );
}
