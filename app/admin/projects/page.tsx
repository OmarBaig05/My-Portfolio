'use client';

import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '@/actions/actions';
import { Plus, Edit2, Trash2, Save, X, Loader2, Upload } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tech_stack: string[];
    github_link: string;
    live_link: string;
}

export default function AdminProjectsPage() {
    const [items, setItems] = useState<Project[]>([]);
    const [editing, setEditing] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        const data = await getProjects() as Project[];
        setItems(data);
    }

    async function uploadImage(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.path || '';
    }

    async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.[0]) {
            const path = await uploadImage(fileInput.files[0]);
            formData.set('image', path);
        } else {
            formData.set('image', imageUrl);
        }
        await createProject(formData);
        setAdding(false);
        setImageUrl('');
        await loadData();
        setLoading(false);
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput?.files?.[0]) {
            const path = await uploadImage(fileInput.files[0]);
            formData.set('image', path);
        }
        await updateProject(formData);
        setEditing(null);
        await loadData();
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this project?')) return;
        await deleteProject(id);
        await loadData();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)]">Projects</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your portfolio projects</p>
                </div>
                <button onClick={() => setAdding(true)} className="admin-btn admin-btn-primary">
                    <Plus size={18} /> Add New
                </button>
            </div>

            {adding && (
                <form onSubmit={handleAdd} className="admin-card mb-6 space-y-4">
                    <div><label className="block text-sm text-slate-400 mb-1">Title</label><input name="title" required className="admin-input" /></div>
                    <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" className="admin-textarea" /></div>
                    <div><label className="block text-sm text-slate-400 mb-1">Project Image</label><input type="file" accept="image/*" className="admin-input" /><input type="hidden" name="image" value={imageUrl} /></div>
                    <div><label className="block text-sm text-slate-400 mb-1">Tech Stack (comma-separated)</label><input name="tech_stack" className="admin-input" placeholder="React, Next.js, Python" /></div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm text-slate-400 mb-1">GitHub Link</label><input name="github_link" className="admin-input" /></div>
                        <div><label className="block text-sm text-slate-400 mb-1">Live Demo Link</label><input name="live_link" className="admin-input" /></div>
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
                                <div><label className="block text-sm text-slate-400 mb-1">Title</label><input name="title" defaultValue={item.title} className="admin-input" /></div>
                                <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" defaultValue={item.description} className="admin-textarea" /></div>
                                <div><label className="block text-sm text-slate-400 mb-1">Update Image</label><input type="file" accept="image/*" className="admin-input" /><input type="hidden" name="image" value={item.image} /></div>
                                <div><label className="block text-sm text-slate-400 mb-1">Tech Stack (comma-separated)</label><input name="tech_stack" defaultValue={item.tech_stack.join(', ')} className="admin-input" /></div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div><label className="block text-sm text-slate-400 mb-1">GitHub Link</label><input name="github_link" defaultValue={item.github_link} className="admin-input" /></div>
                                    <div><label className="block text-sm text-slate-400 mb-1">Live Demo Link</label><input name="live_link" defaultValue={item.live_link} className="admin-input" /></div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">{loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update</button>
                                    <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={18} /> Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {item.image && (
                                        <img src={item.image} alt={item.title} className="w-16 h-12 rounded-lg object-cover" />
                                    )}
                                    <div>
                                        <p className="text-white font-medium">{item.title}</p>
                                        <p className="text-slate-400 text-sm">{item.tech_stack.join(', ')}</p>
                                    </div>
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
