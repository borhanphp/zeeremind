'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const data = await apiRequest('/invoice-reminder/stats', { token });
                setStats(data.data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    if (loading) return <div className="p-8">Loading stats...</div>;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="p-8 max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="space-x-4">
                        <Link href="/invoices/new">
                            <Button>Create Invoice</Button>
                        </Link>
                        <Link href="/invoices">
                            <Button variant="outline">View All Invoices</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Unpaid
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalUnpaid || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                Invoices awaiting payment
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Overdue Amount
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats?.overdueAmount || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                Total value of overdue invoices
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Paid This Month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.paidThisMonth || 0}</div>
                            <p className="text-xs text-muted-foreground">
                                Invoices paid in current month
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
