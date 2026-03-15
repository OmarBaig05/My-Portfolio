'use client';

import SectionWrapper from './SectionWrapper';
import QuestionModal from './QuestionModal';
import { useState } from 'react';
import { MapPin, Mail, Github, Download, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
    address: string;
    email: string;
    github: string;
    resumePath: string;
}

export default function ContactSection({ address, email, github, resumePath }: ContactSectionProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <SectionWrapper id="contact">
            <div className="section-container">
                <h2 className="section-heading gradient-text">Get In Touch</h2>
                <p className="section-subheading">Let&apos;s connect and collaborate</p>

                <div className="max-w-3xl mx-auto">
                    <div className="glass rounded-2xl p-8 md:p-10">
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                            {address && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-accent-cyan" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-400 mb-1">Address</h4>
                                        <p className="text-white text-sm">{address}</p>
                                    </div>
                                </div>
                            )}

                            {email && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                                        <Mail className="text-accent-blue" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-400 mb-1">Email</h4>
                                        <a href={`mailto:${email}`} className="text-white text-sm hover:text-accent-cyan transition-colors">
                                            {email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {github && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center shrink-0">
                                        <Github className="text-accent-purple" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-400 mb-1">GitHub</h4>
                                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-accent-cyan transition-colors">
                                            {github.replace('https://github.com/', '@')}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {resumePath && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-accent-pink/10 flex items-center justify-center shrink-0">
                                        <Download className="text-accent-pink" size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-400 mb-1">Resume</h4>
                                        <a href={resumePath} download className="text-white text-sm hover:text-accent-cyan transition-colors">
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-white/5 pt-6 text-center">
                            <button
                                onClick={() => setShowModal(true)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold hover:shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <MessageCircle size={20} />
                                Have a Question?
                            </button>
                        </div>
                    </div>
                </div>

                <QuestionModal open={showModal} onClose={() => setShowModal(false)} />
            </div>
        </SectionWrapper>
    );
}
