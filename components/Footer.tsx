'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-6 text-center">
                
                <p className="text-slate-600 text-xs mt-2">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
