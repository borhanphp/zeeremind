'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InvoiceForm } from '@/components/InvoiceForm';
import { PageLoader } from '@/components/PageLoader';


import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProUpgradeCard } from '@/components/ProUpgradeCard';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

export default function NewInvoicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [createdInvoice, setCreatedInvoice] = useState<{ _id: string, clientName: string, paymentLink?: string } | null>(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const { subscription, isPro, invoicesRemaining, loading: subscriptionLoading } = useSubscription(token || undefined);

    // If limit reached, show upgrade modal immediately
    const limitReached = !subscriptionLoading && subscription && !isPro && invoicesRemaining !== null && invoicesRemaining <= 0;

    const handleSubmit = async (data: any) => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await apiRequest('/invoice-reminder/invoices', {
                method: 'POST',
                body: data,
                token
            });

            if (response.success && response.data) {
                setCreatedInvoice(response.data);
            } else if (response.code === 'LIMIT_REACHED') {
                setShowUpgradeModal(true);
            } else {
                router.push('/invoices');
            }
        } catch (err: any) {
            console.error('Failed to create invoice', err);
            const errorMessage = err.message?.toLowerCase() || '';
            if (errorMessage.includes('limit') || errorMessage.includes('upgrade') || errorMessage.includes('free plan')) {
                setShowUpgradeModal(true);
            } else if (errorMessage.includes('too many') || errorMessage.includes('rate') || errorMessage.includes('try again')) {
                toast.error(err.message || 'Too many requests. Please try again later.');
            } else {
                toast.error(err.message || 'Failed to create invoice. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (createdInvoice) {
        const paymentLink = createdInvoice.paymentLink;

        const handleCopy = () => {
            if (paymentLink) {
                navigator.clipboard.writeText(paymentLink);
                alert('Link copied to clipboard!');
            }
        };

        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="flex pt-16 w-full items-start justify-center">
                    <Card className="w-[500px]">
                        <CardHeader>
                            <CardTitle className="text-green-600">Invoice Created Successfully! 🎉</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Invoice for <strong>{createdInvoice.clientName}</strong> has been created.
                            </p>

                            {paymentLink ? (
                                <div className="space-y-2">
                                    <Label>Payment Link</Label>
                                    <div className="flex gap-2">
                                        <Input readOnly value={paymentLink} className="bg-gray-100" />
                                        <Button onClick={handleCopy} variant="outline">Copy</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                                    No payment link provided. The client will be asked to contact you for payment.
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setCreatedInvoice(null)}>Create Another</Button>
                                <Button onClick={() => router.push('/invoices')}>
                                    Done
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Show loading while subscription data loads
    if (subscriptionLoading || !subscription) {
        return <PageLoader variant="skeleton" message="Loading..." />;
    }

    // If limit reached, show upgrade card instead of form
    if (limitReached) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="flex pt-16 w-full items-start justify-center">
                    <div className="w-[450px]">
                        <ProUpgradeCard onClose={() => router.push('/invoices')} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex pt-16 w-full items-start justify-center">
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Create New Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InvoiceForm
                            onSubmit={handleSubmit}
                            isSubmitting={loading}
                            onCancel={() => router.push('/invoices')}
                            submitLabel="Create Invoice"
                            isPro={isPro}
                        />
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-transparent border-none shadow-none">
                    <ProUpgradeCard onClose={() => setShowUpgradeModal(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
