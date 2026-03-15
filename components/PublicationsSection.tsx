'use client';

import SectionWrapper from './SectionWrapper';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, BookOpen, Calendar } from 'lucide-react';

interface Publication {
    id: number;
    title: string;
    description: string;
    date: string;
    link: string;
}

interface PublicationsSectionProps {
    publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <SectionWrapper id="publications">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Publications</h2>
                <p className="section-subheading">Research & writings</p>

                <div ref={ref} className="max-w-3xl mx-auto space-y-6">
                    {publications.map((pub, i) => (
                        <motion.div
                            key={pub.id}
                            className="glass rounded-2xl p-6 card-hover gradient-border"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 flex items-center justify-center">
                                    <BookOpen className="text-accent-pink" size={22} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        {pub.date && (
                                            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                                <Calendar size={11} />
                                                {pub.date}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-family-heading)]">
                                        {pub.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{pub.description}</p>
                                    {pub.link && (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:text-accent-blue transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            View Publication
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
