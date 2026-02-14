import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50">
            <Link className="flex items-center justify-center font-bold text-xl" href="/">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zee</span>Remind
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
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
        </header>
    );
}
