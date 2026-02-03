'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import { DashboardNav } from '@/components/DashboardNav';
import { apiRequest } from '@/lib/api';

export default function PricingPage() {
    const [loading, setLoading] = useState(false);

    // This would typically come from your API/AuthContext
    // For now we assume we can fetch it or pass it.
    // Ideally, useAuth() hook provides this.
    // const { user } = useAuth(); 
    // MOCK USER for display (replace with actual auth logic)
    const user = { plan: 'free' };

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // In a real implementation:
            // 1. Initialize Paddle.js
            // 2. Open Checkout with items based on plan

            // Simulating a delay for now as we don't have Paddle keys enabled yet
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("Paddle Checkout would open here!\n\nOnce paid, the webhook updates your account.");

        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to start checkout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto pt-16 px-4 pb-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Always know what you'll pay. Upgrade for unlimited invoices.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <Card className="flex flex-col border-2 relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <CardDescription>Perfect for freelancers just starting out.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="text-4xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" /> 5 Invoices per month
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" /> Email Reminders
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500" /> Basic Reporting
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" disabled>
                                Current Plan
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className={`flex flex-col border-2 ${user.plan === 'pro' ? 'border-indigo-600' : 'border-indigo-100'} shadow-lg relative overflow-hidden`}>
                        {/* Most Popular Badge */}
                        <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl text-black">Pro</CardTitle>
                            <CardDescription>For growing businesses needing more.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="text-4xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-black" /> <strong>Unlimited</strong> Invoices
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-black" /> Automated Schedule
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-black" /> Priority Support
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-black" /> Remove "Powered by"
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {user.plan === 'pro' ? (
                                <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                                    Active
                                </Button>
                            ) : (
                                <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={handleUpgrade} disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Upgrade to Pro'}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
