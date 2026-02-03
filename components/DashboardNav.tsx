'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Settings, LogOut, User } from 'lucide-react';

export function DashboardNav() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <header className="border-b bg-white dark:bg-gray-950">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
                <Link href="/dashboard" className="font-bold text-xl mr-8">
                    ZeeRemind
                </Link>
                <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/invoices"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Invoices
                    </Link>
                    <Link
                        href="/dashboard/profile"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Profile
                    </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}
