'use client';

import SectionWrapper from './SectionWrapper';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tech_stack: string[];
    github_link: string;
    live_link: string;
}

interface ProjectsSectionProps {
    projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <SectionWrapper id="projects">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Projects</h2>
                <p className="section-subheading">Things I&apos;ve built</p>

                <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="glass rounded-2xl overflow-hidden card-hover gradient-border group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-gradient-to-br from-navy-700 to-navy-800 overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Layers className="text-accent-cyan/30" size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Links overlay */}
                                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg glass-strong text-white hover:text-accent-cyan transition-colors"
                                        >
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {project.live_link && (
                                        <a
                                            href={project.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg glass-strong text-white hover:text-accent-cyan transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-family-heading)]">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech_stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
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
        </SectionWrapper>
    );
}
