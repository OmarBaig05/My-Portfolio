'use client';

import SectionWrapper from './SectionWrapper';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Briefcase, GraduationCap, Globe } from 'lucide-react';

interface AboutSectionProps {
    name: string;
    bio: string;
    experienceSummary: string;
    skills: string[];
    educationSummary: string;
    languages: string[];
    linkedin: string;
}

export default function AboutSection({
    bio,
    experienceSummary,
    skills,
    educationSummary,
    languages,
    linkedin,
}: AboutSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <SectionWrapper id="about">
            <div className="section-container">
                <h2 className="section-heading gradient-text">About Me</h2>
                <p className="section-subheading">Get to know me better</p>

                <div ref={ref} className="grid md:grid-cols-2 gap-8">
                    {/* Left - Bio & Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="glass rounded-2xl p-6 card-hover">
                            <p className="text-slate-300 leading-relaxed text-lg">{bio}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="glass rounded-xl p-5 card-hover">
                                <Briefcase className="text-accent-cyan mb-3" size={22} />
                                <h4 className="text-sm text-slate-400 mb-1">Experience</h4>
                                <p className="text-white font-medium text-sm">{experienceSummary}</p>
                            </div>
                            <div className="glass rounded-xl p-5 card-hover">
                                <GraduationCap className="text-accent-blue mb-3" size={22} />
                                <h4 className="text-sm text-slate-400 mb-1">Education</h4>
                                <p className="text-white font-medium text-sm">{educationSummary}</p>
                            </div>
                        </div>

                        <div className="glass rounded-xl p-5 card-hover">
                            <Globe className="text-accent-purple mb-3" size={22} />
                            <h4 className="text-sm text-slate-400 mb-2">Languages</h4>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang) => (
                                    <span key={lang} className="chip">{lang}</span>
                                ))}
                            </div>
                        </div>

                        {linkedin && (
                            <motion.a
                                href={linkedin.match(/^https?:\/\//) ? linkedin : `https://${linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-accent-cyan hover:bg-white/5 transition-all font-medium text-sm"
                                whileHover={{ x: 5 }}
                            >
                                <Linkedin size={18} />
                                Connect on LinkedIn
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Right - Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass rounded-2xl p-6 h-full">
                            <h3 className="text-lg font-semibold text-white mb-5 font-[family-name:var(--font-family-heading)]">
                                Skills & Technologies
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skillGroup, i) => {
                                    const colonIndex = skillGroup.indexOf(':');
                                    const category = colonIndex !== -1 ? skillGroup.slice(0, colonIndex).trim() : null;
                                    const items = colonIndex !== -1
                                        ? skillGroup.slice(colonIndex + 1).split(',').map(s => s.trim()).filter(Boolean)
                                        : [skillGroup];
                                    return (
                                        <motion.div
                                            key={skillGroup}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ delay: i * 0.1 + 0.3 }}
                                        >
                                            {category && (
                                                <h4 className="text-sm font-semibold text-accent-cyan mb-2">{category}</h4>
                                            )}
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((item) => (
                                                    <motion.span
                                                        key={item}
                                                        className="chip"
                                                        whileHover={{ scale: 1.08 }}
                                                    >
                                                        {item}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
