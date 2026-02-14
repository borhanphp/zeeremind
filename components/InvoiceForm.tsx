'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkIcon, Phone, Mail, MessageSquare, Smartphone } from 'lucide-react';
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
    isPro?: boolean;
}

export function InvoiceForm({ initialData, onSubmit, isSubmitting, onCancel, submitLabel, isPro = false }: InvoiceFormProps) {
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

    const toggleChannel = (channel: string) => {
        const channels = formData.reminderChannels || ['email'];
        if (channels.includes(channel)) {
            // Don't allow removing all channels
            if (channels.length > 1) {
                setFormData({ ...formData, reminderChannels: channels.filter(c => c !== channel) });
            }
        } else {
            setFormData({ ...formData, reminderChannels: [...channels, channel] });
        }
    };

    const hasPhone = !!(formData.clientPhone && formData.clientPhone.trim());
    const canUseSmsWhatsApp = hasPhone && isPro;

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
                    <Label htmlFor="clientPhone">Client Phone (Optional)</Label>
                    <div className="relative">
                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="clientPhone"
                            type="tel"
                            placeholder="+1234567890"
                            className="pl-9"
                            value={formData.clientPhone || ''}
                            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-gray-500">Include country code (e.g. +1 for US). Required for SMS/WhatsApp.</p>
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
                            onClick={() => toggleChannel('email')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${(formData.reminderChannels || ['email']).includes('email')
                                ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/40 dark:border-blue-600 dark:text-blue-300'
                                : 'bg-gray-100 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Mail className="h-3.5 w-3.5" />
                            Email
                        </button>
                        <button
                            type="button"
                            onClick={() => canUseSmsWhatsApp && toggleChannel('sms')}
                            disabled={!canUseSmsWhatsApp}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${!canUseSmsWhatsApp
                                ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-600'
                                : (formData.reminderChannels || []).includes('sms')
                                    ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/40 dark:border-green-600 dark:text-green-300'
                                    : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <Smartphone className="h-3.5 w-3.5" />
                            SMS
                            {!isPro && <span className="text-[10px] bg-amber-200 text-amber-800 px-1 rounded dark:bg-amber-800 dark:text-amber-200">PRO</span>}
                        </button>
                        <button
                            type="button"
                            onClick={() => canUseSmsWhatsApp && toggleChannel('whatsapp')}
                            disabled={!canUseSmsWhatsApp}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${!canUseSmsWhatsApp
                                ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-600'
                                : (formData.reminderChannels || []).includes('whatsapp')
                                    ? 'bg-emerald-100 border-emerald-300 text-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-600 dark:text-emerald-300'
                                    : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <MessageSquare className="h-3.5 w-3.5" />
                            WhatsApp
                            {!isPro && <span className="text-[10px] bg-amber-200 text-amber-800 px-1 rounded dark:bg-amber-800 dark:text-amber-200">PRO</span>}
                        </button>
                    </div>
                    {!hasPhone && isPro && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">Add a phone number above to enable SMS and WhatsApp reminders.</p>
                    )}
                    {!isPro && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">SMS and WhatsApp reminders are available on the Pro plan.</p>
                    )}
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

