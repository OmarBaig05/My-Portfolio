'use client';

import { useState, useEffect } from 'react';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/actions/actions';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    link: string;
    file_path: string;
    file_type: string;
}

export default function AdminCertificationsPage() {
    const [items, setItems] = useState<Certification[]>([]);
    const [editing, setEditing] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        const data = await getCertifications() as Certification[];
        setItems(data);
    }

    async function uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.path || '';
    }

    function getFileType(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase() || '';
        if (ext === 'pdf') return 'pdf';
        if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
        return '';
    }

    async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.[0]) {
            const path = await uploadFile(fileInput.files[0]);
            formData.set('file_path', path);
            formData.set('file_type', getFileType(fileInput.files[0].name));
        }
        await createCertification(formData);
        setAdding(false);
        await loadData();
        setLoading(false);
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.[0]) {
            const path = await uploadFile(fileInput.files[0]);
            formData.set('file_path', path);
            formData.set('file_type', getFileType(fileInput.files[0].name));
        }
        await updateCertification(formData);
        setEditing(null);
        await loadData();
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this certification?')) return;
        await deleteCertification(id);
        await loadData();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)]">Certifications</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your professional certificates</p>
                </div>
                <button onClick={() => setAdding(true)} className="admin-btn admin-btn-primary">
                    <Plus size={18} /> Add New
                </button>
            </div>

            {adding && (
                <form onSubmit={handleAdd} className="admin-card mb-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm text-slate-400 mb-1">Title</label><input name="title" required className="admin-input" /></div>
                        <div><label className="block text-sm text-slate-400 mb-1">Issuer</label><input name="issuer" className="admin-input" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm text-slate-400 mb-1">Date</label><input name="date" className="admin-input" placeholder="2023-08" /></div>
                        <div><label className="block text-sm text-slate-400 mb-1">Verification Link</label><input name="link" className="admin-input" /></div>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Certificate File (Image or PDF)</label>
                        <input type="file" accept="image/*,.pdf" className="admin-input" />
                        <input type="hidden" name="file_path" value="" />
                        <input type="hidden" name="file_type" value="" />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">{loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save</button>
                        <button type="button" onClick={() => setAdding(false)} className="admin-btn admin-btn-secondary"><X size={18} /> Cancel</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="admin-card">
                        {editing === item.id ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <input type="hidden" name="id" value={item.id} />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div><label className="block text-sm text-slate-400 mb-1">Title</label><input name="title" defaultValue={item.title} className="admin-input" /></div>
                                    <div><label className="block text-sm text-slate-400 mb-1">Issuer</label><input name="issuer" defaultValue={item.issuer} className="admin-input" /></div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div><label className="block text-sm text-slate-400 mb-1">Date</label><input name="date" defaultValue={item.date} className="admin-input" /></div>
                                    <div><label className="block text-sm text-slate-400 mb-1">Verification Link</label><input name="link" defaultValue={item.link} className="admin-input" /></div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Update Certificate File</label>
                                    <input type="file" accept="image/*,.pdf" className="admin-input" />
                                    <input type="hidden" name="file_path" value={item.file_path} />
                                    <input type="hidden" name="file_type" value={item.file_type} />
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">{loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update</button>
                                    <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={18} /> Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">{item.title}</p>
                                    <p className="text-slate-400 text-sm">{item.issuer} • {item.date}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditing(item.id)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
