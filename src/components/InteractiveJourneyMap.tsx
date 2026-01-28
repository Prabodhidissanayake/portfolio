"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  MapPin,
  Star,
  Code,
  Trophy,
  BookOpen,
  Briefcase,
  Target,
  Play,
  Brain,
} from "lucide-react";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const journeyData = [
  {
    id: 1,
    year: "2017-2018",
    title: "English Language Diploma",
    institution: "ICBT Campus, Sri Lanka",
    type: "education",
    icon: BookOpen,
    description:
      "Built strong communication foundation with European Quality Assurance",
    achievements: [
      "ISO 9001 Certification",
      "English Proficiency",
      "Communication Skills",
    ],
    position: { x: 15, y: 70 },
    skills: ["Communication", "Writing", "Critical Thinking"],
  },
  {
    id: 2,
    year: "2019-2022",
    title: "1st class Degree in B.Sc (Hons) Software Engineering",
    institution: "University of Plymouth, UK",
    type: "education",
    icon: BookOpen,
    description:
      "Graduated with First Class Honors, mastering computer science fundamentals",
    achievements: [
      "First Class Honors",
      "JavaScript/Java Programming",
      "Database Management",
      "Algorithm Design",
    ],
    position: { x: 30, y: 40 },
    skills: [
      "Java",
      "JavaScript",
      "Algorithms",
      "Database Design",
      "Software Architecture",
    ],
  },
  {
    id: 3,
    year: "Jan-Apr 2023",
    title: "Full Stack Bootcamp",
    institution: "School of Applied Technology, Amsterdam",
    type: "bootcamp",
    icon: Code,
    description:
      "Intensive 3-month program focusing on TDD and mob programming",
    achievements: [
      "Test Driven Development",
      "Mob Programming",
      "Agile Methodologies",
    ],
    position: { x: 50, y: 25 },
    skills: ["TDD", "Mob Programming", "React", "Node.js", "Agile"],
  },
  {
    id: 4,
    year: "Jun 2023-Jun 2024",
    title: "Junior Frontend Developer",
    institution: "SuperYacht Times, Amsterdam",
    type: "work",
    icon: Briefcase,
    description:
      "Started professional journey, learning real-world development practices",
    achievements: [
      "React Mastery",
      "Professional Environment",
      "Team Collaboration",
    ],
    position: { x: 70, y: 40 },
    skills: ["React.js", "TypeScript", "Storybook", "Code Review", "Team Work"],
  },
  {
    id: 5,
    year: "Jun 2024-Present",
    title: "Frontend Developer",
    institution: "SuperYacht Times, Amsterdam",
    type: "work",
    icon: Trophy,
    description:
      "Advanced to Frontend Developer, building innovative web solutions",
    achievements: [
      "Technical Leadership",
      "Architecture Decisions",
      "Mentoring",
    ],
    position: { x: 85, y: 20 },
    skills: [
      "Next.js",
      "Tailwind css",
      "Advanced React",
      "Performance Optimization",
      "Leadership",
      "Innovation",
    ],
  },
];

export default function InteractiveJourneyMap() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep >= journeyData.length) {
            setIsPlaying(false);
            return prev;
          }

          setTimeout(() => {
            const nextNode = journeyData[nextStep];
            if (nextNode) {
              setSelectedNode(nextNode.id);
            }
          }, 500);

          return nextStep;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && currentStep === 0) {
      const firstNode = journeyData[0];
      if (firstNode) {
        setSelectedNode(firstNode.id);
      }
    }
  }, [isPlaying, currentStep]);

  const handleNodeClick = (nodeId: number) => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const startAutoPlay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const currentNode = selectedNode
    ? journeyData.find((n) => n.id === selectedNode)
    : null;

  return (
    <section
      id="developerJourney"
      className="py-24 section-padding"
      style={{ backgroundColor: 'var(--bg-coral)' }}
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <MapPin className="text-primary mr-4" size={48} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              My Developer Journey
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my path from student to developer. Click on nodes to
            discover achievements, or watch the animated journey!
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{journeyData.length} Major Milestones</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative w-full h-[600px] bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.4 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: 'var(--color-secondary)', stopOpacity: 0.6 }}
                  />
                </linearGradient>
              </defs>
              <motion.path
                d={`M ${journeyData[0].position.x}% ${
                  journeyData[0].position.y
                }% ${journeyData
                  .slice(1)
                  .map((node) => `L ${node.position.x}% ${node.position.y}%`)
                  .join(" ")}`}
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: isPlaying
                    ? (currentStep + 1) / journeyData.length
                    : 1,
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>

            <motion.div
              className="absolute z-20 pointer-events-none"
              animate={
                isPlaying
                  ? {
                      left: journeyData.map((node) => `${node.position.x}%`),
                      top: journeyData.map((node) => `${node.position.y}%`),
                    }
                  : {
                      left: `${
                        journeyData[Math.min(currentStep, journeyData.length - 1)]
                          .position.x
                      }%`,
                      top: `${
                        journeyData[Math.min(currentStep, journeyData.length - 1)]
                          .position.y
                      }%`,
                    }
              }
              transition={{
                duration: isPlaying ? (journeyData.length - 1) * 3 : 0,
                ease: "easeInOut",
              }}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-20 h-20" ref={playerRef}>
                <Player
                  autoplay={isPlaying}
                  loop={isPlaying}
                  src="/animations/walking-character.json"
                  style={{ height: "100%", width: "100%" }}
                  key={isPlaying ? "playing" : "stopped"}
                />
              </div>
            </motion.div>

            {journeyData.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isPlaying ? (index <= currentStep ? 1 : 0.3) : 1,
                  opacity: isPlaying ? (index <= currentStep ? 1 : 0.5) : 1,
                }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNodeClick(node.id)}
              >

                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                  animate={{
                    scale: selectedNode === node.id ? [1, 1.3, 1] : 1,
                    opacity: selectedNode === node.id ? [0.3, 0.5, 0.3] : 0.2,
                  }}
                  transition={{
                    duration: 2,
                    repeat: selectedNode === node.id ? Infinity : 0,
                  }}
                />

                <motion.div
                  className="relative w-20 h-20 rounded-full shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center"
                  style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                  animate={
                    selectedNode === node.id
                      ? {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <node.icon className="text-white" size={28} />
                </motion.div>

                <motion.div
                  className={`absolute top-24 text-center ${
                    node.position.x > 80
                      ? "right-0"
                      : "left-1/2 transform -translate-x-1/2"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-700 px-3 py-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-600 min-w-max">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {node.year}
                    </p>
                  </div>
                </motion.div>

                {isPlaying && index === currentStep && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-4"
                    style={{ borderColor: 'var(--color-primary)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {currentNode ? (
                <motion.div
                  key={currentNode.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="sticky top-24"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
                    <div
                      className="p-6 text-white flex-shrink-0"
                      style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <currentNode.icon size={24} />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedNode(null)}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-xl"
                        >
                          ×
                        </motion.button>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{currentNode.title}</h3>
                      <p className="text-white/90 text-sm">{currentNode.institution}</p>
                      <p className="text-white/75 text-xs mt-1">{currentNode.year}</p>
                    </div>

                    <div className="px-6 pt-6 pb-8 overflow-y-auto flex-1">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {currentNode.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Trophy className="mr-2 text-secondary" size={18} />
                          Key Achievements
                        </h4>
                        <div className="space-y-2">
                          {currentNode.achievements.map((achievement, index) => (
                            <motion.div
                              key={achievement}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center"
                            >
                              <Star className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {achievement}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Brain className="mr-2 text-primary" size={18} />
                          Skills Gained
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentNode.skills.map((skill, index) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: 'linear-gradient(to right, rgba(50, 145, 182, 0.15), rgba(187, 142, 208, 0.15))',
                                color: 'var(--color-primary)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'var(--color-primary)'
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[600px] bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                      Click on a node or watch the journey to see details
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startAutoPlay}
                      disabled={isPlaying}
                      className="flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                    >
                      <Play className="mr-2" size={20} />
                      Watch Journey
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
