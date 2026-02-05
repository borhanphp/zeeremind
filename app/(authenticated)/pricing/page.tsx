'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubscription } from '@/hooks/useSubscription';
import { createCheckout } from '@/lib/subscription';
import Script from 'next/script';

export default function PricingPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Get auth token from localStorage (adjust based on your auth implementation)
    const [token, setToken] = useState<string | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const { subscription, loading: subLoading, isTrial, isPro } = useSubscription(token || undefined);
    const [paddleLoaded, setPaddleLoaded] = useState(false);

    const handleUpgrade = async () => {
        if (!token) {
            setError('Please log in to upgrade');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            // Get checkout data from backend
            const response = await createCheckout(token, 'pro');
            
            // Initialize Paddle.js if not already loaded
            if (!(window as any).Paddle) {
                setError('Payment system is loading. Please try again.');
                setLoading(false);
                return;
            }

            // Open Paddle checkout
            (window as any).Paddle.Checkout.open({
                items: [{
                    priceId: response.priceId,
                    quantity: 1
                }],
                customData: response.customData,
                customer: {
                    email: response.customerEmail
                },
                settings: {
                    successUrl: `${window.location.origin}/dashboard?upgrade=success`,
                    allowLogout: false
                }
            });

            setLoading(false);
        } catch (err: any) {
            console.error('Checkout failed:', err);
            setError(err.message || 'Failed to start checkout. Please try again.');
            setLoading(false);
        }
    };

    if (subLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <>
            {/* Load Paddle.js */}
            <Script
                src="https://cdn.paddle.com/paddle/v2/paddle.js"
                onLoad={() => {
                    if ((window as any).Paddle) {
                        // Initialize Paddle with client-side token
                        const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
                        
                        if (!clientToken) {
                            console.error('[Paddle] Client token not configured');
                            setError('Payment system not configured. Please contact support.');
                            return;
                        }

                        try {
                            (window as any).Paddle.Initialize({
                                token: clientToken,
                                eventCallback: (event: any) => {
                                    console.log('[Paddle] Event:', event);
                                    if (event.name === 'checkout.completed') {
                                        window.location.href = '/dashboard?upgrade=success';
                                    }
                                }
                            });
                            setPaddleLoaded(true);
                            console.log('[Paddle] Initialized successfully in sandbox mode');
                        } catch (err) {
                            console.error('[Paddle] Initialization error:', err);
                            setError('Failed to initialize payment system');
                        }
                    }
                }}
            />
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto pt-16 px-4 pb-12">
                {/* Trial Banner */}
                {isTrial && subscription?.trial && (
                    <Alert className="mb-8 border-blue-200 bg-blue-50">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-900">
                            <strong>Trial Active!</strong> You have {subscription.trial.daysRemaining} days remaining in your free trial. 
                            Upgrade anytime to keep all Pro features.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Alert */}
                {error && (
                    <Alert className="mb-8 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-900">{error}</AlertDescription>
                    </Alert>
                )}

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
                            {subscription?.plan === 'free' && !isTrial ? (
                                <Button className="w-full" variant="outline" disabled>
                                    Current Plan
                                </Button>
                            ) : isTrial ? (
                                <Badge variant="secondary" className="w-full py-2 justify-center">
                                    Trial Active
                                </Badge>
                            ) : (
                                <Button className="w-full" variant="outline" disabled>
                                    Free Plan
                                </Button>
                            )}
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className={`flex flex-col border-2 ${isPro ? 'border-indigo-600' : 'border-indigo-100'} shadow-lg relative overflow-hidden`}>
                        {/* Most Popular Badge */}
                        {!isPro && (
                            <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                POPULAR
                            </div>
                        )}
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
                            {isPro ? (
                                <div className="w-full space-y-2">
                                    <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                                        ✓ Active Subscription
                                    </Button>
                                    {subscription?.billing?.cancelAtPeriodEnd && (
                                        <p className="text-xs text-center text-muted-foreground">
                                            Cancels on {new Date(subscription.billing.currentPeriodEnd).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <Button 
                                    className="w-full bg-black hover:bg-gray-800 text-white" 
                                    onClick={handleUpgrade} 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Opening checkout...
                                        </>
                                    ) : (
                                        'Upgrade to Pro'
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
}
