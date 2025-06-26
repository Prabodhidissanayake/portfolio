"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import Games from "@/components/Games";
import InteractiveJourneyMap from "@/components/InteractiveJourneyMap";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
        <Games />
        <InteractiveJourneyMap />
        <Contact />
      </main>
    </div>
  );
}
