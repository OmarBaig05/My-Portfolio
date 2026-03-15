'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);

        try {
            const { loginAction } = await import('@/actions/actions');
            const result = await loginAction(formData);
            if (result?.error) {
                setError(result.error);
            }
        } catch {
            // redirect throws - this is expected on success
            router.push('/admin');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-900 p-4">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                className="relative w-full max-w-md glass-strong rounded-2xl p-8"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 mb-4">
                        <LogIn className="text-accent-cyan" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)]">
                        Admin Login
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Enter your credentials to continue</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="admin-input"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="admin-input"
                            placeholder="••••••••"
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
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
