'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    User,
    FileText,
    Briefcase,
    GraduationCap,
    FolderOpen,
    BookOpen,
    Award,
    MessageCircle,
    Mail,
    LogOut,
    ArrowLeft,
} from 'lucide-react';
import { logoutAction } from '@/actions/actions';

const sidebarLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'About Me', href: '/admin/about', icon: User },
    { label: 'Resume', href: '/admin/resume', icon: FileText },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Education', href: '/admin/education', icon: GraduationCap },
    { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { label: 'Publications', href: '/admin/publications', icon: BookOpen },
    { label: 'Certifications', href: '/admin/certifications', icon: Award },
    { label: 'Questions', href: '/admin/questions', icon: MessageCircle },
    { label: 'Contact', href: '/admin/contact', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#0f172a] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1e293b] border-r border-[#334155] flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-30">
                <div className="p-5 border-b border-[#334155]">
                    <h2 className="text-lg font-bold text-white font-[family-name:var(--font-family-heading)]">
                        Admin Panel
                    </h2>
                    <Link href="/" className="text-xs text-accent-cyan flex items-center gap-1 mt-1 hover:text-accent-blue transition-colors">
                        <ArrowLeft size={12} />
                        Back to site
                    </Link>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive
                                        ? 'bg-accent-cyan/10 text-accent-cyan font-medium'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-[#334155]">
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
