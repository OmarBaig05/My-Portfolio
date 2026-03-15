'use client';

import { useState, useEffect } from 'react';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/actions/actions';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

interface Experience {
    id: number;
    date_range: string;
    role: string;
    company: string;
    description: string;
}

export default function AdminExperiencePage() {
    const [items, setItems] = useState<Experience[]>([]);
    const [editing, setEditing] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        const data = await getExperiences() as Experience[];
        setItems(data);
    }

    async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        await createExperience(new FormData(e.currentTarget));
        setAdding(false);
        await loadData();
        setLoading(false);
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        await updateExperience(new FormData(e.currentTarget));
        setEditing(null);
        await loadData();
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this entry?')) return;
        await deleteExperience(id);
        await loadData();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)]">Experience</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your work experience</p>
                </div>
                <button onClick={() => setAdding(true)} className="admin-btn admin-btn-primary">
                    <Plus size={18} /> Add New
                </button>
            </div>

            {adding && (
                <form onSubmit={handleAdd} className="admin-card mb-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm text-slate-400 mb-1">Date Range</label><input name="date_range" required className="admin-input" placeholder="2023 - Present" /></div>
                        <div><label className="block text-sm text-slate-400 mb-1">Role</label><input name="role" required className="admin-input" placeholder="Senior Developer" /></div>
                    </div>
                    <div><label className="block text-sm text-slate-400 mb-1">Company</label><input name="company" required className="admin-input" placeholder="Company Name" /></div>
                    <div><label className="block text-sm text-slate-400 mb-1">Description (use &quot;- &quot; at the start of each line for bullet points)</label><textarea name="description" className="admin-textarea" placeholder="- Built scalable APIs\n- Led a team of 5 engineers" /></div>
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
                                    <div><label className="block text-sm text-slate-400 mb-1">Date Range</label><input name="date_range" defaultValue={item.date_range} className="admin-input" /></div>
                                    <div><label className="block text-sm text-slate-400 mb-1">Role</label><input name="role" defaultValue={item.role} className="admin-input" /></div>
                                </div>
                                <div><label className="block text-sm text-slate-400 mb-1">Company</label><input name="company" defaultValue={item.company} className="admin-input" /></div>
                                <div><label className="block text-sm text-slate-400 mb-1">Description (use &quot;- &quot; at the start of each line for bullet points)</label><textarea name="description" defaultValue={item.description} className="admin-textarea" /></div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">{loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update</button>
                                    <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={18} /> Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">{item.role}</p>
                                    <p className="text-slate-400 text-sm">{item.company} • {item.date_range}</p>
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
