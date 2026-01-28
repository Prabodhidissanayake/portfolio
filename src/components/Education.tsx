"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

const education = [
  {
    id: 1,
    institution: "University of Plymouth",
    degree: "B.Sc (Hons) Software Engineering",
    location: "United Kingdom",
    duration: "2019 - 2022",
    description:
      "Graduated with First Class Honors. Attained understanding of Computer Science fundamentals, Java and Javascript programming languages, computing mathematics, and advanced concepts such as database management, algorithms, data structures, system analysis, design, and software development tools.",
    achievements: [
      "First Class Honors",
      "Computer Science fundamentals",
      "Advanced software development concepts",
    ],
    coursework: [
      "Java Programming",
      "JavaScript Programming",
      "Database Management",
      "Algorithms & Data Structures",
      "System Analysis & Design",
      "Software Development Tools",
      "Computing Mathematics",
    ],
  },
  {
    id: 2,
    institution: "School of Applied Technology",
    degree: "Full Stack Bootcamp",
    location: "Amsterdam",
    duration: "January 2023 - April 2023",
    description:
      "Intensive 3-month training program with a focus on TDD, mob programming, and applied learning.",
    achievements: [
      "Test Driven Development (TDD)",
      "Mob Programming expertise",
      "Applied learning approach",
      "Intensive 3-month program",
    ],
    coursework: [
      "Test Driven Development",
      "Mob Programming",
      "Full Stack Development",
      "Applied Learning",
      "Modern Web Technologies",
    ],
  },
  {
    id: 3,
    institution: "ICBT Campus",
    degree: "Diploma in English Language & Literature",
    location: "Sri Lanka",
    duration: "2017 - 2018",
    description:
      "European Quality Assurance - ISO 9001 BUREAU VERITAS Certification",
    achievements: [
      "European Quality Assurance",
      "ISO 9001 BUREAU VERITAS Certification",
      "English Language proficiency",
    ],
    coursework: [
      "English Language",
      "Literature Studies",
      "Writing & Communication",
      "Critical Analysis",
    ],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 section-padding"
      style={{ backgroundColor: 'var(--bg-green)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
        </motion.div>

        <div className="mb-16">

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 card-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h4>
                    <p className="text-xl text-primary font-semibold mb-2">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm font-medium">
                        {edu.duration}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{edu.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {edu.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="mr-2 text-secondary" size={18} />
                      Achievements
                    </h5>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-300 flex items-start"
                        >
                          <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: 'var(--color-secondary)' }}></span>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Relevant Coursework
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
