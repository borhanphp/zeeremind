'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkIcon, Mail } from 'lucide-react';
import { useState } from 'react';

interface InvoiceFormData {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    amount: string;
    dueDate: string;
    paymentLink: string;
    invoiceNumber?: string;
    reminderChannels: string[];
}

interface InvoiceFormProps {
    initialData?: InvoiceFormData;
    onSubmit: (data: InvoiceFormData) => void;
    isSubmitting: boolean;
    onCancel: () => void;
    submitLabel: string;
    isPro: boolean;
}

export function InvoiceForm({ initialData, onSubmit, isSubmitting, onCancel, submitLabel, isPro }: InvoiceFormProps) {
    const [formData, setFormData] = useState<InvoiceFormData>(initialData || {
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        amount: '',
        dueDate: '',
        paymentLink: '',
        invoiceNumber: '',
        reminderChannels: ['email']
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

                {/* Reminder Channels */}
                <div className="flex flex-col space-y-2">
                    <Label>Reminder Channels</Label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            disabled
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${(formData.reminderChannels || ['email']).includes('email')
                                ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/40 dark:border-blue-600 dark:text-blue-300'
                                : 'bg-gray-100 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Mail className="h-3.5 w-3.5" />
                            Email
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Reminders are currently sent by email.</p>
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

