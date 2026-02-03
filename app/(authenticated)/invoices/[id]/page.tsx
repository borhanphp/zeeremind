'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardNav } from '@/components/DashboardNav';
import { Loader2, ArrowLeft, Mail, Clock, Calendar, DollarSign, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [invoice, setInvoice] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            // Fetch Invoice
            const invoiceData = await apiRequest(`/invoice-reminder/invoices/${id}`, { token });
            setInvoice(invoiceData.data);

            // Fetch Logs
            const logsData = await apiRequest(`/invoice-reminder/invoices/${id}/logs`, { token });
            setLogs(logsData.data);

        } catch (err) {
            console.error('Failed to fetch invoice details', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id, router]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchDetails();
    };

    if (loading) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8 text-center">
                <p>Invoice not found.</p>
                <Link href="/invoices">
                    <Button variant="link">Go back to invoices</Button>
                </Link>
            </div>
        );
    }

    const getLogIcon = (type: string) => {
        switch (type) {
            case 'manual_reminder': return <Mail className="h-4 w-4 text-blue-500" />;
            case 'before_due': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'on_due': return <Calendar className="h-4 w-4 text-orange-500" />;
            case 'after_due': return <Clock className="h-4 w-4 text-red-500" />;
            default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const formatLogType = (type: string) => {
        switch (type) {
            case 'manual_reminder': return 'Manual Reminder Sent';
            case 'before_due': return 'Upcoming Due Reminder';
            case 'on_due': return 'Due Today Reminder';
            case 'after_due': return 'Overdue Reminder';
            default: return type.replace(/_/g, ' ');
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto pt-8 px-4 pb-12">
                <div className="mb-6">
                    <Button variant="ghost" onClick={() => router.push('/invoices')} className="mb-4 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
                    </Button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {invoice.clientName}
                                </h1>
                                <Badge variant={
                                    invoice.status === 'paid' ? 'default' :
                                        invoice.status === 'overdue' ? 'destructive' : 'secondary'
                                } className={
                                    invoice.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-200 border-none' :
                                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800 hover:bg-red-200 border-none' :
                                            'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none'
                                }>
                                    {invoice.status.toUpperCase()}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">

                                {invoice.invoiceNumber && (
                                    <>
                                        <span className="font-medium">#{invoice.invoiceNumber}</span>
                                        <span>•</span>
                                    </>
                                )}
                                <span className="flex items-center gap-1 mb-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    {invoice.clientEmail}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                Refresh Status
                            </Button>
                            <Link href={`/invoices/edit/${invoice._id}`}>
                                <Button>Edit Invoice</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Details */}
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Invoice Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" /> Amount
                                            </p>
                                            <p className="text-2xl font-bold">${invoice.amount.toLocaleString()}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Calendar className="h-4 w-4" /> Due Date
                                            </p>
                                            <p className="text-xl">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">Payment Link</p>
                                        {invoice.paymentLink ? (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <a href={invoice.paymentLink} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                                                    {invoice.paymentLink}
                                                </a>
                                                <ExternalLink className="h-3 w-3" />
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">No payment link provided.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Timeline / History */}
                        <div>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" /> Activity Log
                                    </CardTitle>
                                    <CardDescription>History of sent reminders</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {logs.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-8">No reminders sent yet.</p>
                                    ) : (
                                        <div className="space-y-6 relative pl-2">
                                            {/* Vertical Line */}
                                            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />

                                            {logs.map((log) => (
                                                <div key={log._id} className="relative flex items-start gap-4">
                                                    <div className="relative z-10 bg-white dark:bg-gray-950 p-1 rounded-full border">
                                                        {getLogIcon(log.type)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {formatLogType(log.type)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(log.sentAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
