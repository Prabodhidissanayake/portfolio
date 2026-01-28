"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Lightbulb, Zap } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [showBulbAnimation, setShowBulbAnimation] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;

    setShowBulbAnimation(true);

    setTimeout(() => {
      setShowBulbAnimation(false);
    }, 1500);

    setTimeout(() => {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  return (
    <>
      <AnimatePresence>
        {showBulbAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5,
            }}
            className="fixed top-20 right-4 z-50 pointer-events-none"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-full blur-xl ${
                  isDark ? "bg-blue-400/50" : "bg-yellow-400/60"
                }`}
              />
              <motion.div
                animate={{
                  rotate: [-5, 5, -5],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                  isDark
                    ? "bg-gray-800 border-2 border-blue-400/50"
                    : "bg-yellow-100 border-2 border-yellow-400/50"
                } shadow-lg`}
              >
                {isDark ? (
                  <>
                    <Lightbulb className="text-gray-500" size={28} />
                 
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 border-2 border-gray-400 rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <Lightbulb
                        className="text-yellow-500"
                        size={28}
                        fill="currentColor"
                      />
                    </motion.div>

                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-3 bg-yellow-400 rounded-full"
                          style={{
                            top: "10%",
                            left: "50%",
                            transformOrigin: "50% 250%",
                            transform: `translateX(-50%) rotate(${i * 45}deg)`,
                          }}
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scaleY: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>

                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        initial={{
                          scale: 0,
                          x: 0,
                          y: 0,
                          opacity: 0,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          x: [0, (i % 2 ? 1 : -1) * 20],
                          y: [0, (i > 1 ? 1 : -1) * 20],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.3 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      >
                        <Zap size={8} className="text-yellow-400" />
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{
            backgroundColor: isDark ? "#1f2937" : "#e5e7eb",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full"
        />

        <motion.div
          animate={{
            x: isDark ? 24 : 2,
            backgroundColor: isDark ? "#3b82f6" : "#f59e0b",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="absolute top-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotate: isDark ? 180 : 0,
              scale: showBulbAnimation ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Moon className="text-white" size={12} />
            ) : (
              <Sun className="text-white" size={12} />
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            showBulbAnimation
              ? {
                  scale: [0, 1.5],
                  opacity: [0.5, 0],
                }
              : {}
          }
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-full border-2 border-blue-400 dark:border-yellow-400"
        />
      </motion.button>
    </>
  );
}