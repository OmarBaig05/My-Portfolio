'use client';

import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

interface ResumeSectionProps {
    resumePath: string;
}

export default function ResumeSection({ resumePath }: ResumeSectionProps) {
    return (
        <SectionWrapper id="resume">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Resume</h2>
                <p className="section-subheading">Download my latest resume</p>

                <motion.div
                    className="glass rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto card-hover"
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 mb-4">
                            <FileText className="text-accent-cyan" size={36} />
                        </div>
                        <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-family-heading)]">
                            My Professional Resume
                        </h3>
                        <p className="text-slate-400 mt-2">
                            View my qualifications, experience, and skills
                        </p>
                    </div>

                    {resumePath ? (
                        <a
                            href={resumePath}
                            download
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold hover:shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    ) : (
                        <p className="text-slate-500 italic">Resume will be available soon</p>
                    )}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
