"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Customer Management System",
    description:
      "A modern SPA for managing customer data with detailed profile pages and seamless editing capabilities. Features a comprehensive list view with search and filter functionality, allowing efficient customer relationship management.",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Firebase",
    ],
    liveUrl: "https://customer-management-system-two.vercel.app/customers",
    githubUrl: undefined,
    featured: true,
  },
  {
    id: 2,
    title: "Clay Leaf Art E-commerce",
    description:
      "A fully-functional e-commerce platform for selling handcrafted clay leaves. Built with Next.js and Firebase, featuring product catalog, user authentication with Firebase Auth, shopping cart, complete checkout flow with address management, and real-time chat for custom orders. Mobile responsive with SEO optimization.",
    technologies: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://clay-leaf-art.vercel.app/",
    githubUrl: undefined,
    featured: true,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 section-padding"
      style={{ backgroundColor: 'var(--bg-peach)' }}
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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for
            frontend development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink
                        size={18}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    </motion.a>
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Source Code"
                      >
                        <Github
                          size={18}
                          className="text-gray-700 dark:text-gray-300"
                        />
                      </motion.a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium"
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

                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:underline transition-colors font-medium"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors font-medium"
                    >
                      <Github size={16} className="mr-1" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Prabodhidissanayake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
          >
            <Github className="mr-2" size={20} />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
