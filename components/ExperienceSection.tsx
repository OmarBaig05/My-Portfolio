'use client';

import SectionWrapper from './SectionWrapper';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Building2 } from 'lucide-react';

interface Experience {
    id: number;
    date_range: string;
    role: string;
    company: string;
    description: string;
}

interface ExperienceSectionProps {
    experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <SectionWrapper id="experience">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Experience</h2>
                <p className="section-subheading">My professional journey</p>

                <div ref={ref} className="relative max-w-3xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-blue/30 to-transparent" />

                    <div className="space-y-8">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                className="relative pl-16 md:pl-20"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/30 ring-4 ring-navy-900" />

                                <div className="glass rounded-2xl p-6 card-hover gradient-border">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full">
                                            <Calendar size={12} />
                                            {exp.date_range}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                                            <Building2 size={12} />
                                            {exp.company}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-family-heading)]">
                                        {exp.role}
                                    </h3>
                                    {(() => {
                                        const lines = exp.description.split('\n').map(l => l.trim()).filter(Boolean);
                                        const hasBullets = lines.some(l => l.startsWith('- ') || l.startsWith('• '));
                                        if (!hasBullets) {
                                            return <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>;
                                        }
                                        // Group lines: plain text before bullets, then merge continuation lines into their bullet
                                        const preamble: string[] = [];
                                        const bullets: string[] = [];
                                        let seenBullet = false;
                                        for (const line of lines) {
                                            if (line.startsWith('- ') || line.startsWith('• ')) {
                                                seenBullet = true;
                                                bullets.push(line.replace(/^[-•]\s*/, ''));
                                            } else if (seenBullet) {
                                                // Continuation of the previous bullet
                                                bullets[bullets.length - 1] += ' ' + line;
                                            } else {
                                                preamble.push(line);
                                            }
                                        }
                                        return (
                                            <div className="text-slate-400 text-sm leading-relaxed space-y-2">
                                                {preamble.length > 0 && (
                                                    <p>{preamble.join(' ')}</p>
                                                )}
                                                <ul className="list-disc list-inside space-y-1">
                                                    {bullets.map((text, idx) => (
                                                        <li key={idx}>{text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
