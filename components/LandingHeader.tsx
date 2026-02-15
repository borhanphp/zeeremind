"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50">
            <Link className="flex items-center justify-center font-bold text-xl" href="/">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zee</span>Remind
            </Link>

            {/* Desktop Navigation */}
            <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors" href="/#features">
                    Features
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors" href="/pricing">
                    Pricing
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors" href="/login">
                    Login
                </Link>
                <Link href="/login?signup=true">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25">
                        Sign Up Free
                    </Button>
                </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className="ml-auto md:hidden p-2 text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 p-4 md:hidden flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
                    <Link
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors py-2"
                        href="/#features"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors py-2"
                        href="/pricing"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Pricing
                    </Link>
                    <Link
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors py-2"
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>
                    <Link href="/login?signup=true" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25">
                            Sign Up Free
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    );
}
