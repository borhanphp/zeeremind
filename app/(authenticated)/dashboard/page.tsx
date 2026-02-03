'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardNav } from '@/components/DashboardNav';
import { Button } from '@/components/ui/button';
import { Progress } from "../../../components/ui/progress"
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUnpaid: 0,
        overdueAmount: 0,
        paidThisMonth: 0,
        invoiceUsage: 0, // Mock usage
        plan: 'free' // Mock Plan
    });
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
                // We mock the plan/usage data here since the stats API doesn't return it yet.
                // In a real scenario, the API would return { ...stats, plan: 'free', invoiceUsage: 3 }
                setStats({
                    ...data.data,
                    plan: 'free',
                    invoiceUsage: data.data.invoiceCount || 3 // Fallback mock
                });
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <Link href="/invoices/new">
                            <Button className="bg-black hover:bg-gray-800 text-white">
                                Create New Invoice
                            </Button>
                        </Link>
                    </div>

                    {/* Subscription Status Widget */}
                    <div className="mb-8">
                        <Card className="bg-gradient-to-r from-indigo-50 to-white border-indigo-100">
                            <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-indigo-900">Current Plan: <span className="uppercase font-bold">{stats.plan}</span></h3>
                                    <p className="text-sm text-indigo-700">You have used {stats.invoiceUsage} of 5 free invoices this month.</p>
                                    <div className="w-[200px] mt-2">
                                        <Progress value={(stats.invoiceUsage / 5) * 100} className="h-2" />
                                    </div>
                                </div>
                                <div>
                                    {stats.plan === 'free' && (
                                        <Link href="/pricing">
                                            <Button className="bg-black hover:bg-gray-800 text-white">
                                                Upgrade to Pro
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Unpaid Invoices
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalUnpaid}</div>
                                <p className="text-xs text-muted-foreground">
                                    Active invoices pending payment
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Overdue Amount
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">
                                    ${stats.overdueAmount.toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Total value of overdue invoices
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Paid This Month
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {stats.paidThisMonth}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Invoices paid in the current month
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
