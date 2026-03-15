import {
    getExperiences,
    getEducation,
    getProjects,
    getPublications,
    getCertifications,
    getQuestions,
} from '@/actions/actions';
import {
    Briefcase,
    GraduationCap,
    FolderOpen,
    BookOpen,
    Award,
    MessageCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const experiences = await getExperiences() as unknown[];
    const education = await getEducation() as unknown[];
    const projects = await getProjects() as unknown[];
    const publications = await getPublications() as unknown[];
    const certifications = await getCertifications() as unknown[];
    const questions = await getQuestions() as { is_read: number }[];

    const unreadQuestions = questions.filter((q) => !q.is_read).length;

    const stats = [
        { label: 'Experience', count: experiences.length, icon: Briefcase, color: 'text-accent-cyan' },
        { label: 'Education', count: education.length, icon: GraduationCap, color: 'text-accent-blue' },
        { label: 'Projects', count: projects.length, icon: FolderOpen, color: 'text-accent-purple' },
        { label: 'Publications', count: publications.length, icon: BookOpen, color: 'text-accent-pink' },
        { label: 'Certifications', count: certifications.length, icon: Award, color: 'text-green-400' },
        { label: 'Questions', count: questions.length, icon: MessageCircle, color: 'text-yellow-400', badge: unreadQuestions },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-family-heading)]">
                Dashboard
            </h1>
            <p className="text-slate-400 text-sm mb-8">Overview of your portfolio content</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="admin-card flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{stat.count}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                            {stat.badge ? (
                                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                                    {stat.badge} new
                                </span>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
