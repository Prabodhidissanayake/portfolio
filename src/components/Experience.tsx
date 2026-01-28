"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    position: "Frontend Developer",
    location: "Amsterdam, Netherlands",
    duration: "June 2024 - Present",
    description: [
      "Contributing to innovative web solutions for the luxury superyacht industry",
      "Developing and maintaining responsive web applications using modern frontend technologies",
      "Implementing user-friendly interfaces for superyacht enthusiasts and industry professionals",
      "Collaborating with the development team to enhance user experience and platform functionality",
      "Working with React.js, Next.js, and TypeScript to build scalable frontend solutions",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "SASS",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    position: "Junior Frontend Developer",
    location: "Amsterdam, Netherlands",
    duration: "June 2023 - June 2024",
    description: [
      "Learned and applied modern web development practices in a professional environment",
      "Developed skills in React.js and TypeScript while working on real-world projects",
      "Participated in code reviews and gained experience with agile development methodologies",
      "Contributed to building user interfaces for the superyacht industry platform",
    ],
    technologies: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Git",
      "Agile",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 section-padding bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block" style={{ background: `linear-gradient(to bottom, var(--color-primary), var(--color-secondary))` }}></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block" style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}></div>

                <div className="md:ml-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 card-hover">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {experience.position}
                      </h3>
                    </div>

                    <div className="flex flex-col md:items-end mt-4 md:mt-0 space-y-2">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm font-medium">
                          {experience.duration}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm">{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {experience.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-600 dark:text-gray-300 flex items-start"
                      >
                        <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: 'linear-gradient(to right, rgba(50, 145, 182, 0.15), rgba(187, 142, 208, 0.15))',
                          color: 'var(--color-primary)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'var(--color-primary)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
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
