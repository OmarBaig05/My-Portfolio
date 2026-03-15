'use client';

import { useState, useEffect } from 'react';
import { getSetting, updateSetting } from '@/actions/actions';
import { Upload, Loader2, CheckCircle, FileText } from 'lucide-react';

export default function AdminResumePage() {
    const [resumePath, setResumePath] = useState('');
    const [uploading, setUploading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        getSetting('resume_path').then(setResumePath);
    }, []);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.path) {
            await updateSetting('resume_path', data.path);
            setResumePath(data.path);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
        setUploading(false);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-family-heading)]">
                Manage Resume
            </h1>
            <p className="text-slate-400 text-sm mb-8">Upload or replace your resume PDF</p>

            <div className="admin-card max-w-lg">
                {resumePath && (
                    <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-white/5">
                        <FileText className="text-accent-cyan" size={20} />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">Current: {resumePath}</p>
                        </div>
                        <a
                            href={resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent-cyan hover:text-accent-blue transition-colors"
                        >
                            View
                        </a>
                    </div>
                )}

                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#334155] rounded-xl cursor-pointer hover:border-accent-cyan/50 transition-colors">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleUpload}
                        className="hidden"
                    />
                    {uploading ? (
                        <Loader2 className="animate-spin text-accent-cyan mb-2" size={32} />
                    ) : saved ? (
                        <CheckCircle className="text-green-400 mb-2" size={32} />
                    ) : (
                        <Upload className="text-slate-400 mb-2" size={32} />
                    )}
                    <span className="text-sm text-slate-400">
                        {uploading ? 'Uploading...' : saved ? 'Resume updated!' : 'Click to upload PDF'}
                    </span>
                </label>
            </div>
        </div>
    );
}
