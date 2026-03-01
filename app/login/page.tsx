'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Special states
    const [showVerificationNeeded, setShowVerificationNeeded] = useState(false);
    const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState('');
    const [verifiedSuccess, setVerifiedSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            setVerifiedSuccess(true);
            setTimeout(() => setVerifiedSuccess(false), 5000);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowVerificationNeeded(false);
        setShowRegistrationSuccess(false);

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const body = isLogin ? { email, password } : { name, companyName, email, password, role: 'user' };

            const data = await apiRequest(endpoint, {
                method: 'POST',
                body,
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/invoices');
            } else if (data.success && !isLogin) {
                // Registration successful — show verification needed
                setShowRegistrationSuccess(true);
            } else {
                setError('Authentication failed');
            }
        } catch (err: any) {
            // Check if it's a verification-required error
            if (err.message?.toLowerCase().includes('verify your email') ||
                err.message?.toLowerCase().includes('verification')) {
                setShowVerificationNeeded(true);
            } else {
                setError(err.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setResendLoading(true);
        setResendMessage('');
        try {
            const data = await apiRequest('/auth/resend-verification', {
                method: 'POST',
                body: { email },
            });
            setResendMessage(data.message || 'Verification email sent! Check your inbox.');
        } catch (err: any) {
            setResendMessage(err.message || 'Failed to resend. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    // Registration success state
    if (showRegistrationSuccess) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Card className="w-[400px]">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="rounded-full bg-indigo-100 p-4">
                                <Mail className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold">Check Your Email</h2>
                            <p className="text-gray-600 text-sm">
                                We&apos;ve sent a verification link to <strong>{email}</strong>.
                                Please click the link in the email to verify your account before logging in.
                            </p>
                            <div className="w-full pt-2 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleResendVerification}
                                    disabled={resendLoading}
                                >
                                    {resendLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                                    ) : 'Resend Verification Email'}
                                </Button>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        setShowRegistrationSuccess(false);
                                        setIsLogin(true);
                                    }}
                                >
                                    Go to Login
                                </Button>
                            </div>
                            {resendMessage && (
                                <p className="text-sm text-green-600">{resendMessage}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Verification needed state (login blocked)
    if (showVerificationNeeded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Card className="w-[400px]">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="rounded-full bg-amber-100 p-4">
                                <Mail className="h-8 w-8 text-amber-600" />
                            </div>
                            <h2 className="text-xl font-semibold">Email Not Verified</h2>
                            <p className="text-gray-600 text-sm">
                                Please verify your email address before logging in.
                                Check your inbox for the verification link.
                            </p>
                            <div className="w-full pt-2 space-y-2">
                                <Button
                                    className="w-full"
                                    onClick={handleResendVerification}
                                    disabled={resendLoading}
                                >
                                    {resendLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                                    ) : 'Resend Verification Email'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setShowVerificationNeeded(false);
                                        setError('');
                                    }}
                                >
                                    Back to Login
                                </Button>
                            </div>
                            {resendMessage && (
                                <p className="text-sm text-green-600">{resendMessage}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
                    <CardDescription>
                        {isLogin ? 'Enter your credentials to access your account.' : 'Create an account to start sending reminders.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {verifiedSuccess && (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md p-3 mb-4">
                            <CheckCircle className="h-4 w-4 flex-shrink-0" />
                            <span>Email verified successfully! You can now log in.</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            {!isLogin && (
                                <>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <Input id="companyName" placeholder="Acme Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    </div>
                                </>
                            )}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {isLogin && (
                                <div className="flex justify-end">
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-4 flex flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    );
}
