'use client';

import SectionWrapper from './SectionWrapper';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, ExternalLink, Calendar, X, Eye } from 'lucide-react';

interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    link: string;
    file_path: string;
    file_type: string;
}

interface CertificationsSectionProps {
    certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    return (
        <SectionWrapper id="certifications">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Certifications</h2>
                <p className="section-subheading">Professional credentials</p>

                <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            className="glass rounded-2xl p-6 card-hover gradient-border"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 flex items-center justify-center shrink-0">
                                    <Award className="text-accent-cyan" size={20} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-white truncate font-[family-name:var(--font-family-heading)]">
                                        {cert.title}
                                    </h3>
                                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                                </div>
                            </div>

                            {cert.date && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                                    <Calendar size={11} />
                                    {cert.date}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:text-accent-blue transition-colors"
                                    >
                                        <ExternalLink size={12} />
                                        Verify
                                    </a>
                                )}
                                {cert.file_path && (
                                    <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="inline-flex items-center gap-1 text-xs text-accent-purple hover:text-accent-pink transition-colors"
                                    >
                                        <Eye size={12} />
                                        Preview
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedCert && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                        >
                            <motion.div
                                className="relative max-w-3xl w-full max-h-[85vh] glass-strong rounded-2xl overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between p-4 border-b border-white/10">
                                    <h3 className="text-white font-semibold">{selectedCert.title}</h3>
                                    <button
                                        onClick={() => setSelectedCert(null)}
                                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-4 overflow-auto max-h-[75vh]">
                                    {selectedCert.file_type === 'pdf' ? (
                                        <iframe
                                            src={selectedCert.file_path}
                                            className="w-full h-[70vh] rounded-lg"
                                            title={selectedCert.title}
                                        />
                                    ) : (
                                        <img
                                            src={selectedCert.file_path}
                                            alt={selectedCert.title}
                                            className="max-w-full h-auto rounded-lg mx-auto"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
