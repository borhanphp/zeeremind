'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardNav } from '@/components/DashboardNav';

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    // Prevent hydration mismatch or flash of content before redirect
    if (!mounted) return null;

    return (
        <div className="flex-1 bg-gray-50 dark:bg-gray-900">
            <DashboardNav />
            {children}
        </div>
    );
}
