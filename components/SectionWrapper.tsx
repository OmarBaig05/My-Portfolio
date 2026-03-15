'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export default function SectionWrapper({ children, id, className = '', delay = 0 }: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.section
            id={id}
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
        >
            {children}
        </motion.section>
    );
}
