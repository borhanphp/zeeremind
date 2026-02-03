'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For signup
    const [companyName, setCompanyName] = useState(''); // For signup
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const body = isLogin ? { email, password } : { name, companyName, email, password, role: 'user' }; // Default role

            const data = await apiRequest(endpoint, {
                method: 'POST',
                body,
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else if (data.success && !isLogin) {
                // Registration successful
                setIsLogin(true); // Switch to login view
                alert(data.message || 'Registration successful. Please check your email.');
                setError(''); // Clear any errors
            } else {
                // Should not happen if success is true, but handle safely
                setError('Authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

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
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
