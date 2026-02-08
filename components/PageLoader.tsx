'use client';

import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PageLoaderProps {
    message?: string;
    variant?: 'spinner' | 'skeleton' | 'card';
}

export function PageLoader({ message = 'Loading...', variant = 'spinner' }: PageLoaderProps) {
    if (variant === 'skeleton') {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header skeleton */}
                    <div className="flex justify-between items-center">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </div>

                    {/* Cards skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </CardHeader>
                                <CardContent>
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                                    <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Table skeleton */}
                    <Card>
                        <div className="p-6 space-y-4">
                            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-14 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                            <p className="text-lg font-medium text-gray-900 dark:text-white">{message}</p>
                            <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Default spinner variant
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <Loader2 className="h-12 w-12 text-gray-300 dark:text-gray-600 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-6 bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 rounded-full animate-pulse" />
                    </div>
                </div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">{message}</p>
            </div>
        </div>
    );
}

export function InlineLoader({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                <p className="text-sm text-gray-500">{message}</p>
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 px-4 py-4 border rounded-lg">
                    {[1, 2, 3, 4, 5].map((j) => (
                        <div
                            key={j}
                            className="h-4 flex-1 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
                            style={{ animationDelay: `${(i * 5 + j) * 0.05}s` }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
