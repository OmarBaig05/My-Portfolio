'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
    name: string;
    roles: string[];
    bio: string;
    profileImage: string;
}

export default function HeroSection({ name, roles, bio, profileImage }: HeroSectionProps) {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [roles.length]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px]" />
                <div className="bg-grid absolute inset-0 opacity-40" />
            </div>

            <div className="relative z-10 section-container text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    className="mb-8"
                >
                    {profileImage ? (
                        <div className="relative inline-block">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple blur-lg opacity-50" />
                            <img
                                src={profileImage}
                                alt={name}
                                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/10"
                            />
                        </div>
                    ) : (
                        <div className="relative inline-block">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple blur-lg opacity-50" />
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-navy-800 border-2 border-white/10 flex items-center justify-center">
                                <span className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-family-heading)]">
                                    {name.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-family-heading)] mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    Hi, I&apos;m <span className="gradient-text">{name || 'Developer'}</span>
                </motion.h1>

                <motion.div
                    className="h-12 mb-6 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={roleIndex}
                            className="text-xl md:text-2xl lg:text-3xl font-semibold text-accent-cyan"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {roles[roleIndex] || 'Developer'}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                >
                    {bio}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                >
                    <a
                        href="#projects"
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold hover:shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Get In Touch
                    </a>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
                >
                    <ChevronDown className="text-slate-500" size={28} />
                </motion.div>
            </div>
        </section>
    );
}
