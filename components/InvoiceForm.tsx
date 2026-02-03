'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface InvoiceFormData {
    clientName: string;
    clientEmail: string;
    amount: string;
    dueDate: string;
    paymentLink: string;
    invoiceNumber?: string;
}

interface InvoiceFormProps {
    initialData?: InvoiceFormData;
    onSubmit: (data: InvoiceFormData) => void;
    isSubmitting: boolean;
    onCancel: () => void;
    submitLabel: string;
}

export function InvoiceForm({ initialData, onSubmit, isSubmitting, onCancel, submitLabel }: InvoiceFormProps) {
    const [formData, setFormData] = useState<InvoiceFormData>(initialData || {
        clientName: '',
        clientEmail: '',
        amount: '',
        dueDate: '',
        paymentLink: '',
        invoiceNumber: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="invoiceNumber">Invoice Number (Optional)</Label>
                    <Input
                        id="invoiceNumber"
                        placeholder="e.g. INV-001"
                        value={formData.invoiceNumber || ''}
                        onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                        id="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="paymentLink">Payment Link</Label>
                    <div className="relative">
                        <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="paymentLink"
                            type="url"
                            placeholder="https://..."
                            className="pl-9"
                            value={formData.paymentLink}
                            onChange={(e) => setFormData({ ...formData, paymentLink: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
