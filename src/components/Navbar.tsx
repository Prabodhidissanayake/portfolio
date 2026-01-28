"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Dev Journey", href: "#developerJourney", hideOnMobile: true },
  { name: "Games", href: "#games" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (typeof window !== "undefined") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            Prabodhi Dissanayake
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8 text-nowrap">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-700/95 backdrop-blur-lg rounded-b-lg shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems
                .filter((item) => !item.hideOnMobile)
                .map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200 font-medium py-2"
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
