'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { submitQuestion } from '@/actions/actions';

interface QuestionModalProps {
    open: boolean;
    onClose: () => void;
}

export default function QuestionModal({ open, onClose }: QuestionModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        await submitQuestion(formData);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 2000);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-md glass-strong rounded-2xl overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-family-heading)]">
                                Ask a Question
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {success ? (
                            <div className="p-10 text-center">
                                <CheckCircle className="text-green-400 mx-auto mb-3" size={48} />
                                <p className="text-white font-medium">Message sent successfully!</p>
                                <p className="text-slate-400 text-sm mt-1">I&apos;ll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Your Name</label>
                                    <input
                                        name="name"
                                        required
                                        className="admin-input"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="admin-input"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Your Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="admin-textarea"
                                        placeholder="I'd love to discuss..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold hover:shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
