'use client';

import { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '@/actions/actions';
import { Save, Loader2, CheckCircle, Upload, X } from 'lucide-react';

export default function AdminAboutPage() {
    const [data, setData] = useState<{
        name: string; roles: string[]; bio: string; experience_summary: string;
        skills: string[]; education_summary: string; languages: string[]; linkedin: string;
        profile_image: string;
    } | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        getAbout().then((result) => {
            const d = result as typeof data;
            setData(d);
            setProfileImage(d?.profile_image || '');
        });
    }, []);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const json = await res.json();
        if (json.path) {
            setProfileImage(json.path);
        }
        setUploading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.currentTarget);
        formData.set('profile_image', profileImage);
        await updateAbout(formData);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    if (!data) return <div className="text-slate-400">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-family-heading)]">
                Edit About Me
            </h1>
            <p className="text-slate-400 text-sm mb-8">Update your personal information</p>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
                {/* Profile Image Upload */}
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Profile Image</label>
                    <div className="flex items-center gap-4">
                        {profileImage ? (
                            <div className="relative">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-[#334155]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setProfileImage('')}
                                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <X size={14} className="text-white" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-[#0f172a] border-2 border-[#334155] flex items-center justify-center text-slate-500">
                                No image
                            </div>
                        )}
                        <label className="admin-btn admin-btn-secondary cursor-pointer">
                            {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                            {uploading ? 'Uploading...' : 'Upload Image'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Name</label>
                    <input name="name" defaultValue={data.name} className="admin-input" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Roles (comma-separated)</label>
                    <input name="roles" defaultValue={data.roles.join(', ')} className="admin-input" placeholder="ML Engineer, AI Researcher, Developer" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Biography</label>
                    <textarea name="bio" defaultValue={data.bio} rows={4} className="admin-textarea" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Experience Summary</label>
                    <input name="experience_summary" defaultValue={data.experience_summary} className="admin-input" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Skills (one category per line, e.g. &quot;Core Concepts: LLMs, NLP, ML&quot;)</label>
                    <textarea name="skills" defaultValue={data.skills.join('\n')} rows={6} className="admin-textarea" placeholder={"Core Concepts: LLMs, NLP, Machine Learning\nProgramming Languages: Python, JavaScript\nFrameworks & Libraries: TensorFlow, PyTorch\nDeployment: Docker, VPS"} />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Education Summary</label>
                    <input name="education_summary" defaultValue={data.education_summary} className="admin-input" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Languages (comma-separated)</label>
                    <input name="languages" defaultValue={data.languages.join(', ')} className="admin-input" />
                </div>
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">LinkedIn URL</label>
                    <input name="linkedin" defaultValue={data.linkedin} className="admin-input" />
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
