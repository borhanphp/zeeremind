'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
    params: Promise<{ token: string }>;
};

export default function VerifyEmailPage({ params }: Props) {
    const { token } = use(params);
    const router = useRouter();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        if (!token) return;

        const verifyEmail = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/verify-email/${token}`);
                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message || 'Email verified successfully!');

                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        router.push('/login?verified=true');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed. Please try again.');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
                setMessage('An error occurred during verification. Please try again later.');
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Email Verification
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {status === 'verifying' && (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                <p className="text-gray-600 text-center">{message}</p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <div className="rounded-full bg-green-100 p-3">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-green-600 text-center font-medium">{message}</p>
                                <p className="text-gray-500 text-sm text-center">Redirecting to login in a few seconds...</p>
                                <Link
                                    href="/login"
                                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Go to Login
                                </Link>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <div className="rounded-full bg-red-100 p-3">
                                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <p className="text-red-600 text-center font-medium">{message}</p>
                                <div className="mt-6 w-full">
                                    <Link
                                        href="/login"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
