import { getQuestions, markQuestionRead } from '@/actions/actions';
import { Mail, Clock, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Question {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
    is_read: number;
}

export default async function AdminQuestionsPage() {
    const questions = await getQuestions() as Question[];

    async function markRead(formData: FormData) {
        'use server';
        const id = Number(formData.get('id'));
        await markQuestionRead(id);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-family-heading)]">
                User Questions
            </h1>
            <p className="text-slate-400 text-sm mb-8">
                Messages from visitors ({questions.filter(q => !q.is_read).length} unread)
            </p>

            {questions.length === 0 ? (
                <div className="admin-card text-center py-12">
                    <Mail className="text-slate-500 mx-auto mb-3" size={32} />
                    <p className="text-slate-400">No questions yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className={`admin-card ${!q.is_read ? 'border-accent-cyan/30' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-white font-medium flex items-center gap-2">
                                        {q.name}
                                        {!q.is_read && (
                                            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-accent-cyan/20 text-accent-cyan font-medium">NEW</span>
                                        )}
                                    </p>
                                    <a href={`mailto:${q.email}`} className="text-sm text-accent-cyan hover:text-accent-blue transition-colors">
                                        {q.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock size={11} />
                                        {new Date(q.created_at).toLocaleDateString()}
                                    </span>
                                    {!q.is_read && (
                                        <form action={markRead}>
                                            <input type="hidden" name="id" value={q.id} />
                                            <button type="submit" className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-green-400 transition-colors" title="Mark as read">
                                                <CheckCircle size={16} />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed bg-white/3 rounded-lg p-3">
                                {q.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
