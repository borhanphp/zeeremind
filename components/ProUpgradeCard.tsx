'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { createCheckout } from '@/lib/subscription';
import Script from 'next/script';

interface ProUpgradeCardProps {
    onClose?: () => void;
}

export function ProUpgradeCard({ onClose }: ProUpgradeCardProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paddleLoaded, setPaddleLoaded] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));

            // Check if Paddle is already loaded
            if ((window as any).Paddle) {
                setPaddleLoaded(true);
            }
        }
    }, []);

    const initializePaddle = () => {
        if ((window as any).Paddle && !paddleLoaded) {
            const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

            if (!clientToken) {
                console.error('[Paddle] Client token not configured');
                setError('Payment system not configured');
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
                console.log('[Paddle] Initialized successfully');
            } catch (err) {
                console.error('[Paddle] Initialization error:', err);
                setError('Failed to initialize payment system');
            }
        }
    };

    const handleUpgrade = async () => {
        if (!token) {
            setError('Please log in to upgrade');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Get checkout data from backend (unified endpoint)
            const response = await createCheckout(token, 'pro', billingCycle);

            if (response.type === 'redirect' && response.data.checkoutUrl) {
                // Polar: redirect to checkout page
                window.location.href = response.data.checkoutUrl;
                return;
            }

            // Paddle: client-side checkout
            if (!(window as any).Paddle) {
                setError('Payment system is loading. Please try again.');
                setLoading(false);
                return;
            }

            (window as any).Paddle.Checkout.open({
                items: [{
                    priceId: response.data.priceId,
                    quantity: 1
                }],
                customData: response.data.customData,
                customer: {
                    email: response.data.customerEmail
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

    return (
        <>
            {/* Load Paddle.js */}
            <Script
                src="https://cdn.paddle.com/paddle/v2/paddle.js"
                onLoad={initializePaddle}
            />

            <Card className="w-full max-w-md border-2 shadow-xl relative overflow-hidden">
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                </div>

                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                    <CardDescription>For growing businesses needing more.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`flex-1 text-xs font-medium py-1.5 px-3 rounded-md transition-all ${billingCycle === 'monthly'
                                    ? 'bg-white text-black shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`flex-1 text-xs font-medium py-1.5 px-3 rounded-md transition-all ${billingCycle === 'annual'
                                    ? 'bg-white text-black shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Annual <span className="text-green-600">-21%</span>
                        </button>
                    </div>

                    {/* Price */}
                    <div>
                        <div className="text-4xl font-bold">
                            {billingCycle === 'annual' ? '$179' : '$19'}
                            <span className="text-base font-normal text-muted-foreground">
                                {billingCycle === 'annual' ? '/year' : '/mo'}
                            </span>
                        </div>
                        {billingCycle === 'annual' && (
                            <p className="text-xs text-green-600 font-medium mt-1">$14.92/mo — save $49/year</p>
                        )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-black" />
                            <span><strong>Unlimited</strong> Invoices</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-black" />
                            SMS & WhatsApp Reminders
                        </li>

                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-black" />
                            Everything in Free
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-black" />
                            Priority Support
                        </li>
                    </ul>

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                </CardContent>

                <CardFooter className="pt-2">
                    <Button
                        className="w-full bg-black hover:bg-gray-800 text-white py-6 text-base"
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
                </CardFooter>
            </Card>
        </>
    );
}
