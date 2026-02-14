'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardNav } from '@/components/DashboardNav';
import { InvoiceForm } from '@/components/InvoiceForm';
import { PageLoader } from '@/components/PageLoader';
import { useSubscription } from '@/hooks/useSubscription';

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Unwrap params
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const { isPro } = useSubscription(token || undefined);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const data = await apiRequest('/invoice-reminder/invoices', { token });
                const invoice = data.data.find((inv: any) => inv._id === id);

                if (invoice) {
                    setInitialData({
                        clientName: invoice.clientName,
                        clientEmail: invoice.clientEmail,
                        clientPhone: invoice.clientPhone || '',
                        amount: invoice.amount,
                        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
                        paymentLink: invoice.paymentLink || '',
                        invoiceNumber: invoice.invoiceNumber || '',
                        reminderChannels: invoice.reminderChannels || ['email']
                    });
                } else {
                    alert('Invoice not found');
                    router.push('/invoices');
                }
            } catch (err) {
                console.error('Failed to fetch invoice', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            await apiRequest(`/invoice-reminder/invoices/${id}`, {
                method: 'PUT',
                body: data,
                token
            });

            router.push('/invoices'); // Redirect to list
        } catch (err) {
            console.error('Failed to update invoice', err);
            alert('Failed to update invoice');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <PageLoader message="Loading invoice..." />;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

            <div className="flex pt-16 w-full items-start justify-center">
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Edit Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InvoiceForm
                            initialData={initialData}
                            onSubmit={handleSubmit}
                            isSubmitting={saving}
                            onCancel={() => router.push('/invoices')}
                            submitLabel="Save Changes"
                            isPro={isPro}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
