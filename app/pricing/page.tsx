import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublicPricingPage() {
    return (
        <div className="flex flex-col flex-1">
            {/* Navigation - keeping consistent with Landing Page */}
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center font-bold text-xl" href="/">
                    ZeeRemind
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                        Login
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login?signup=true">
                        Sign Up
                    </Link>
                </nav>
            </header>

            <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12 md:py-24">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
                            Start for free, upgrade when you grow. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <Card className="flex flex-col border-2 relative overflow-hidden bg-white dark:bg-gray-800">
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
                                <Link href="/login?signup=true" className="w-full">
                                    <Button className="w-full" variant="outline">
                                        Get Started for Free
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="flex flex-col border-2 border-indigo-600 shadow-lg relative overflow-hidden bg-white dark:bg-gray-800">
                            <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                POPULAR
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>For growing businesses needing more.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="text-4xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> <strong>Unlimited</strong> Invoices
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> Automated Schedule
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> Priority Support
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> Remove "Powered by"
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/login?signup=true&plan=pro" className="w-full">
                                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                                        Get Started with Pro
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="mt-16 max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-6 text-left">
                            <div>
                                <h3 className="font-semibold">Can I cancel anytime?</h3>
                                <p className="text-gray-500 dark:text-gray-400">Yes, you can cancel your subscription at any time. You'll keep access until the end of your billing period.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Do you offer refunds?</h3>
                                <p className="text-gray-500 dark:text-gray-400">Yes, we offer a 14-day money-back guarantee if you're not satisfied.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">What payment methods do you accept?</h3>
                                <p className="text-gray-500 dark:text-gray-400">We accept all major credit cards and PayPal via our secure payment processor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
