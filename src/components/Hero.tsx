"use client";

import { motion } from "framer-motion";
import { ArrowUp, Download } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Player with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function Hero() {
  const scrollToHome = () => {
    if (typeof window !== "undefined") {
      const element = document.querySelector("#home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const downloadResume = () => {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Prabodhi_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding pt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-600 dark:text-blue-400 font-medium"
            >
              Hello, I am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            >
              Prabodhi Dissanayake
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl lg:text-3xl gradient-text font-semibold"
            >
              Frontend Developer
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
          >
            Creative Frontend Developer focused on building clean and
            interactive user experiences. I specialize in modern web
            technologies and love bringing designs to life with smooth
            animations and pixel-perfect precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg floating-animation">
            <Player
              autoplay
              loop
              src="/animations/coding.json"
              style={{ height: "500px", width: "100%" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToHome}
        >
          <div className="flex gap-2">
            <span>Back To Top</span>
            <ArrowUp
              className="text-gray-400 hover:text-blue-600 transition-colors"
              size={24}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}