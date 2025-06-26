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
  Pause,
  RotateCcw,
  Coffee,
  Lightbulb,
  Heart,
  Rocket,
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
    color: "from-emerald-400 to-cyan-500",
    description:
      "Built strong communication foundation with European Quality Assurance",
    achievements: [
      "ISO 9001 Certification",
      "English Proficiency",
      "Communication Skills",
    ],
    position: { x: 15, y: 75 },
    skills: ["Communication", "Writing", "Critical Thinking"],
  },
  {
    id: 2,
    year: "2019-2022",
    title: "1st class Degree in B.Sc (Hons) Software Engineering",
    institution: "University of Plymouth, UK",
    type: "education",
    icon: BookOpen,
    color: "from-blue-400 to-purple-500",
    description:
      "Graduated with First Class Honors, mastering computer science fundamentals",
    achievements: [
      "First Class Honors",
      "JavaScript/Java Programming",
      "Database Management",
      "Algorithm Design",
    ],
    position: { x: 30, y: 45 },
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
    color: "from-orange-400 to-red-500",
    description:
      "Intensive 3-month program focusing on TDD and mob programming",
    achievements: [
      "Test Driven Development",
      "Mob Programming",
      "Agile Methodologies",
    ],
    position: { x: 50, y: 30 },
    skills: ["TDD", "Mob Programming", "React", "Node.js", "Agile"],
  },
  {
    id: 4,
    year: "Jun 2023-Jun 2024",
    title: "Junior Frontend Developer",
    institution: "SuperYacht Times, Amsterdam",
    type: "work",
    icon: Briefcase,
    color: "from-green-400 to-emerald-500",
    description:
      "Started professional journey, learning real-world development practices",
    achievements: [
      "React Mastery",
      "Professional Environment",
      "Team Collaboration",
    ],
    position: { x: 70, y: 45 },
    skills: ["React.js", "TypeScript", "Git", "Code Review", "Team Work"],
  },
  {
    id: 5,
    year: "Jun 2024-Present",
    title: "Frontend Developer",
    institution: "SuperYacht Times, Amsterdam",
    type: "work",
    icon: Trophy,
    color: "from-purple-400 to-pink-500",
    description:
      "Advanced to Frontend Developer, building innovative web solutions",
    achievements: [
      "Technical Leadership",
      "Architecture Decisions",
      "Mentoring",
    ],
    position: { x: 85, y: 25 },
    skills: [
      "Next.js",
      "Advanced React",
      "Performance Optimization",
      "Leadership",
      "Innovation",
    ],
  },
];

const interactiveMilestones = [
  {
    x: 22,
    y: 60,
    icon: Coffee,
    message: "☕ Countless cups of coffee fueled this journey!",
  },
  {
    x: 40,
    y: 38,
    icon: Lightbulb,
    message: "💡 That 'aha!' moment when everything clicked",
  },
  {
    x: 60,
    y: 38,
    icon: Heart,
    message: "❤️ Fell in love with clean, maintainable code",
  },
  {
    x: 77,
    y: 35,
    icon: Rocket,
    message: "🚀 Ready to build the future of web!",
  },
];

export default function InteractiveJourneyMap() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [discoveredMilestones, setDiscoveredMilestones] = useState<number[]>(
    []
  );
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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
          }, 1000);

          return nextStep;
        });
      }, 3500); // 3.5 seconds between moves
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const player = playerRef.current as any;
        if (player.play) {
          player.play();
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const player = playerRef.current as any;
        if (player.pause) {
          player.pause();
        }
      }
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

  const handleMilestoneClick = (index: number) => {
    if (activeMilestone === index) {
      setActiveMilestone(null);
    } else {
      setActiveMilestone(index);
      if (!discoveredMilestones.includes(index)) {
        setDiscoveredMilestones([...discoveredMilestones, index]);
      }
    }
  };

  const resetJourney = () => {
    setCurrentStep(0);
    setSelectedNode(null);
    setIsPlaying(false);
    setDiscoveredMilestones([]);
    setActiveMilestone(null);
  };

  const startAutoPlay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <section
      id="journey"
      className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <MapPin className="text-blue-600 mr-4" size={48} />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              My Developer Journey
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my path from student to developer. Click on nodes to
            discover achievements, or watch the animated journey!
          </p>

          {/* Interactive Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startAutoPlay}
              disabled={isPlaying}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <Play className="mr-2" size={20} />
              Watch Journey
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                } else {
                  setIsPlaying(true);
                }
              }}
              className="flex items-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetJourney}
              className="flex items-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <RotateCcw size={20} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{journeyData.length} Major Milestones</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Journey Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="relative w-full max-w-4xl mx-auto h-[400px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.3) 2px, transparent 0)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Journey Path */}
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
                  stopColor="rgb(59, 130, 246)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="50%"
                  stopColor="rgb(147, 51, 234)"
                  stopOpacity="0.5"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(236, 72, 153)"
                  stopOpacity="0.7"
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
              strokeDasharray="10,5"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: isPlaying
                  ? (currentStep + 1) / journeyData.length
                  : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Walking Character with Lottie Animation */}
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
              duration: isPlaying ? (journeyData.length - 1) * 3.5 : 0, // Slower movement: 3.5 seconds per step
              ease: "easeInOut",
            }}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              className="relative w-16 h-16"
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {/* Lottie Walking Animation */}
              <div className="w-full h-full" ref={playerRef}>
                <Player
                  autoplay={isPlaying}
                  loop={isPlaying}
                  src="/animations/walking-character.json"
                  style={{ height: "100%", width: "100%" }}
                  key={isPlaying ? "playing" : "stopped"}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-0 flex items-center justify-center">
                🚶‍♂️
              </div>
            </motion.div>
          </motion.div>

          {/* Journey Nodes */}
          {journeyData.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNodeClick(node.id)}
            >
              {/* Node Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-full blur-lg bg-gradient-to-r ${node.color}`}
                animate={{
                  scale: selectedNode === node.id ? [1, 1.2, 1] : 1,
                  opacity: selectedNode === node.id ? [0.3, 0.6, 0.3] : 0.2,
                }}
                transition={{
                  duration: 2,
                  repeat: selectedNode === node.id ? Infinity : 0,
                }}
              />

              {/* Main Node */}
              <motion.div
                className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${node.color} shadow-lg border-3 border-white dark:border-gray-800 flex items-center justify-center`}
                animate={
                  selectedNode === node.id
                    ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <node.icon className="text-white" size={18} />
              </motion.div>

              {/* Node Label */}
              <motion.div
                className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-md border border-gray-200 dark:border-gray-600">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {node.year}
                  </p>
                </div>
              </motion.div>

              {/* Progress Indicator */}
              {isPlaying && index === currentStep && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-4 border-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}

          {/* Interactive Milestones (Easter Eggs) */}
          {interactiveMilestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${milestone.x}%`, top: `${milestone.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.3 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleMilestoneClick(index)}
            >
              <motion.div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md flex items-center justify-center ${
                  discoveredMilestones.includes(index)
                    ? "ring-2 ring-yellow-300"
                    : ""
                }`}
                animate={
                  discoveredMilestones.includes(index)
                    ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <milestone.icon className="text-white" size={12} />
              </motion.div>

              {/* Milestone Tooltip */}
              <AnimatePresence>
                {activeMilestone === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none"
                  >
                    {milestone.message}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Node Details */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              {(() => {
                const node = journeyData.find((n) => n.id === selectedNode);
                if (!node) return null;

                return (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div
                      className={`bg-gradient-to-r ${node.color} p-6 text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <node.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{node.title}</h3>
                            <p className="text-white/90">{node.institution}</p>
                            <p className="text-white/75 text-sm">{node.year}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedNode(null)}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          ×
                        </motion.button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                        {node.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Trophy
                              className="mr-2 text-yellow-500"
                              size={20}
                            />
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {node.achievements.map((achievement, index) => (
                              <motion.div
                                key={achievement}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center"
                              >
                                <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {achievement}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Brain className="mr-2 text-blue-500" size={20} />
                            Skills Gained
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {node.skills.map((skill, index) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
