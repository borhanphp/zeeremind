'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Pencil, Trash2, Bell, CheckCircle, Loader2, Eye, Mail, Smartphone, MessageSquare } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProUpgradeCard } from '@/components/ProUpgradeCard';
import { useSubscription } from '@/hooks/useSubscription';
import { PageLoader } from '@/components/PageLoader';

export default function InvoicesPage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<any[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const { isPro, invoicesRemaining, refresh: subscriptionRefresh } = useSubscription(token || undefined);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('token') || undefined;
                if (!token) {
                    router.push('/login');
                    return;
                }

                const data = await apiRequest('/invoice-reminder/invoices', { token });
                setInvoices(data.data);
                setFilteredInvoices(data.data);
            } catch (err) {
                console.error('Failed to fetch invoices', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [router]);

    useEffect(() => {
        let result = invoices;

        if (searchQuery) {
            result = result.filter(inv =>
                inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inv.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(inv => inv.status === statusFilter);
        }

        setFilteredInvoices(result);
    }, [invoices, searchQuery, statusFilter]);

    const handleMarkAsPaid = async (id: string) => {
        try {
            const token = localStorage.getItem('token') || undefined;
            await apiRequest(`/invoice-reminder/invoices/${id}/pay`, {
                method: 'PUT',
                token
            });
            // Update local state
            setInvoices(invoices.map(inv =>
                inv._id === id ? { ...inv, status: 'paid' } : inv
            ));
        } catch (err) {
            console.error('Failed to mark as paid', err);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const token = localStorage.getItem('token') || undefined;
            await apiRequest(`/invoice-reminder/invoices/${deleteId}`, {
                method: 'DELETE',
                token
            });
            setInvoices(invoices.filter(inv => inv._id !== deleteId));
            setDeleteId(null);
            // Refresh subscription to update invoicesRemaining count
            subscriptionRefresh();
        } catch (err) {
            console.error('Failed to delete invoice', err);
        }
    };

    const handleSendReminder = async (id: string) => {
        setSendingReminderId(id);
        try {
            const token = localStorage.getItem('token') || undefined;
            await apiRequest(`/invoice-reminder/invoices/${id}/remind`, {
                method: 'POST',
                token
            });
            alert('Reminder sent successfully!');

            // Optimistically update reminders count (optional, but nice)
            setInvoices(invoices.map(inv =>
                inv._id === id ? {
                    ...inv,
                    remindersSent: [...(inv.remindersSent || []), new Date().toISOString()]
                } : inv
            ));

        } catch (err) {
            console.error('Failed to send reminder', err);
            alert('Failed to send reminder');
        } finally {
            setSendingReminderId(null);
        }
    };

    const handleCreateInvoice = () => {
        // If user is on free plan and has reached the limit, show upgrade modal
        if (!isPro && invoicesRemaining !== null && invoicesRemaining <= 0) {
            setShowUpgradeModal(true);
        } else {
            router.push('/invoices/new');
        }
    };

    if (loading) return <PageLoader variant="skeleton" message="Loading invoices..." />;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold">Invoices</h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Button onClick={handleCreateInvoice}>Create New Invoice</Button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <Input
                        placeholder="Search by client name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-md"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="border rounded-md bg-white dark:bg-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Reminders</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInvoices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24">
                                        No invoices found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredInvoices.map((invoice) => (
                                    <TableRow key={invoice._id}>
                                        <TableCell className="font-medium">{invoice.clientName}</TableCell>
                                        <TableCell>{invoice.clientEmail}</TableCell>
                                        <TableCell>${invoice.amount}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                            </span>
                                        </TableCell>
                                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <span>{invoice.remindersSent?.length || 0}</span>
                                                <div className="flex gap-0.5">
                                                    {(invoice.reminderChannels || ['email']).includes('email') && (
                                                        <span title="Email"><Mail className="h-3.5 w-3.5 text-blue-500" /></span>
                                                    )}
                                                    {(invoice.reminderChannels || []).includes('sms') && (
                                                        <span title="SMS"><Smartphone className="h-3.5 w-3.5 text-green-500" /></span>
                                                    )}
                                                    {(invoice.reminderChannels || []).includes('whatsapp') && (
                                                        <span title="WhatsApp"><MessageSquare className="h-3.5 w-3.5 text-emerald-500" /></span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {invoice.status !== 'paid' && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Mark as Paid"
                                                            onClick={() => handleMarkAsPaid(invoice._id)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Send Reminder Now"
                                                            onClick={() => handleSendReminder(invoice._id)}
                                                            disabled={sendingReminderId === invoice._id}
                                                        >
                                                            {sendingReminderId === invoice._id ? (
                                                                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                                            ) : (
                                                                <Bell className="h-4 w-4 text-blue-600" />
                                                            )}
                                                        </Button>
                                                    </>
                                                )}
                                                <Link href={`/invoices/${invoice._id}`}>
                                                    <Button variant="ghost" size="icon" title="View Details">
                                                        <Eye className="h-4 w-4 text-gray-600" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/invoices/edit/${invoice._id}`}>
                                                    <Button variant="ghost" size="icon" title="Edit">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Delete"
                                                    onClick={() => setDeleteId(invoice._id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this invoice and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Upgrade Modal */}
            <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-transparent border-none shadow-none">
                    <ProUpgradeCard onClose={() => setShowUpgradeModal(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
