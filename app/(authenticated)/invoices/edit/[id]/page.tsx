'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardNav } from '@/components/DashboardNav';
import { InvoiceForm } from '@/components/InvoiceForm';

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Unwrap params
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);

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
                        amount: invoice.amount,
                        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
                        paymentLink: invoice.paymentLink || '',
                        invoiceNumber: invoice.invoiceNumber || ''
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

    if (loading) return <div className="p-8 text-center">Loading invoice details...</div>;

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
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
