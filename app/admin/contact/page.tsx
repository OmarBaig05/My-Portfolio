'use client';

import { useState, useEffect } from 'react';
import { getSetting, updateSetting } from '@/actions/actions';
import { Save, Loader2, CheckCircle } from 'lucide-react';

export default function AdminContactPage() {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [github, setGithub] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        async function load() {
            const [a, e, g] = await Promise.all([
                getSetting('contact_address'),
                getSetting('contact_email'),
                getSetting('contact_github'),
            ]);
            setAddress(a);
            setEmail(e);
            setGithub(g);
            setLoading(false);
        }
        load();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        await Promise.all([
            updateSetting('contact_address', address),
            updateSetting('contact_email', email),
            updateSetting('contact_github', github),
        ]);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    if (loading) return <div className="text-slate-400">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-family-heading)]">
                Contact Settings
            </h1>
            <p className="text-slate-400 text-sm mb-8">Update your contact information displayed on the site</p>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Address</label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="admin-input"
                        placeholder="123 Tech Avenue, San Francisco, CA 94105"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="admin-input"
                        placeholder="omar@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">GitHub URL</label>
                    <input
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="admin-input"
                        placeholder="https://github.com/yourusername"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="admin-btn admin-btn-primary"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : saved ? <CheckCircle size={18} /> : <Save size={18} />}
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
