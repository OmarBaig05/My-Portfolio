'use client';

import { useState, useEffect } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '@/actions/actions';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

interface Education {
    id: number;
    dates: string;
    degree: string;
    institution: string;
    description: string;
}

export default function AdminEducationPage() {
    const [items, setItems] = useState<Education[]>([]);
    const [editing, setEditing] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        const data = await getEducation() as Education[];
        setItems(data);
    }

    async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        await createEducation(new FormData(e.currentTarget));
        setAdding(false);
        await loadData();
        setLoading(false);
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        await updateEducation(new FormData(e.currentTarget));
        setEditing(null);
        await loadData();
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this entry?')) return;
        await deleteEducation(id);
        await loadData();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-family-heading)]">Education</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your education history</p>
                </div>
                <button onClick={() => setAdding(true)} className="admin-btn admin-btn-primary">
                    <Plus size={18} /> Add New
                </button>
            </div>

            {adding && (
                <form onSubmit={handleAdd} className="admin-card mb-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm text-slate-400 mb-1">Dates</label><input name="dates" required className="admin-input" placeholder="2021 - 2023" /></div>
                        <div><label className="block text-sm text-slate-400 mb-1">Degree</label><input name="degree" required className="admin-input" placeholder="M.S. Computer Science" /></div>
                    </div>
                    <div><label className="block text-sm text-slate-400 mb-1">Institution</label><input name="institution" required className="admin-input" placeholder="University Name" /></div>
                    <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" className="admin-textarea" /></div>
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
                                    <div><label className="block text-sm text-slate-400 mb-1">Dates</label><input name="dates" defaultValue={item.dates} className="admin-input" /></div>
                                    <div><label className="block text-sm text-slate-400 mb-1">Degree</label><input name="degree" defaultValue={item.degree} className="admin-input" /></div>
                                </div>
                                <div><label className="block text-sm text-slate-400 mb-1">Institution</label><input name="institution" defaultValue={item.institution} className="admin-input" /></div>
                                <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" defaultValue={item.description} className="admin-textarea" /></div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">{loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update</button>
                                    <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={18} /> Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">{item.degree}</p>
                                    <p className="text-slate-400 text-sm">{item.institution} • {item.dates}</p>
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
