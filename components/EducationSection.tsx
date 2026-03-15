'use client';

import SectionWrapper from './SectionWrapper';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, GraduationCap } from 'lucide-react';

interface Education {
    id: number;
    dates: string;
    degree: string;
    institution: string;
    description: string;
}

interface EducationSectionProps {
    education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <SectionWrapper id="education">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Education</h2>
                <p className="section-subheading">My academic background</p>

                <div ref={ref} className="relative max-w-3xl mx-auto">
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple/50 via-accent-blue/30 to-transparent" />

                    <div className="space-y-8">
                        {education.map((edu, i) => (
                            <motion.div
                                key={edu.id}
                                className="relative pl-16 md:pl-20"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-accent-purple shadow-lg shadow-accent-purple/30 ring-4 ring-navy-900" />

                                <div className="glass rounded-2xl p-6 card-hover gradient-border">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full">
                                            <Calendar size={12} />
                                            {edu.dates}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                                            <GraduationCap size={12} />
                                            {edu.institution}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-family-heading)]">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
