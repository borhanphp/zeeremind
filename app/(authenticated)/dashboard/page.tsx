'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardNav } from '@/components/DashboardNav';
import { Button } from '@/components/ui/button';
import { Progress } from "../../../components/ui/progress";
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { ProUpgradeCard } from '@/components/ProUpgradeCard';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSubscription } from '@/hooks/useSubscription';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUnpaid: 0,
        overdueAmount: 0,
        paidThisMonth: 0,
    });
    const [loading, setLoading] = useState(true);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const { subscription, isPro, invoicesRemaining, loading: subscriptionLoading } = useSubscription(token || undefined);

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

    const handleCreateInvoice = () => {
        // If subscription data hasn't loaded yet, navigate to form directly
        if (subscriptionLoading) {
            router.push('/invoices/new');
            return;
        }
        // If user is on free plan and has reached the limit, show upgrade modal
        if (!isPro && invoicesRemaining !== null && invoicesRemaining <= 0) {
            setShowUpgradeModal(true);
        } else {
            router.push('/invoices/new');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <Button
                            className="bg-black hover:bg-gray-800 text-white"
                            onClick={handleCreateInvoice}
                        >
                            Create New Invoice
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Subscription Card - Takes full width on mobile, 1 col on desktop */}
                        <div className="lg:col-span-1">
                            <SubscriptionCard />
                        </div>

                        {/* Stats Cards - Takes 2 cols on desktop */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
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

            {/* Upgrade Modal */}
            <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-transparent border-none shadow-none">
                    <ProUpgradeCard onClose={() => setShowUpgradeModal(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

