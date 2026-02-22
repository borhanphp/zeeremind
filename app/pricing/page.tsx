import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";

export default function PublicPricingPage() {
    return (
        <div className="flex flex-col flex-1">
            <LandingHeader />

            <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12 md:py-24">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
                            Start free, upgrade when you need more. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">Free</CardTitle>
                                <CardDescription>Perfect to get started</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="text-4xl font-bold mb-6">
                                    $0<span className="text-base font-normal text-gray-400">/month</span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" /> 5 Invoices per month
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" /> Email Reminders
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" /> Automated Schedule
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" /> Payment Link Tracking
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/login?signup=true" className="w-full">
                                    <Button className="w-full" variant="outline">Get Started Free</Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="flex flex-col border-2 border-black dark:border-white relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                MOST POPULAR
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>For growing businesses</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="text-4xl font-bold mb-6">
                                    $9<span className="text-base font-normal text-gray-400">/month</span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> <strong>Unlimited</strong> Invoices
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> Everything in Free
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> SMS Reminders
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> WhatsApp Reminders
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-black dark:text-white" /> Priority Support
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/login?signup=true&plan=pro" className="w-full">
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                        Upgrade to Pro
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
                        <p>All plans include a 14-day money-back guarantee. No questions asked.</p>
                        <p className="mt-2">
                            Have questions?{' '}
                            <Link href="/contact" className="text-blue-600 hover:underline">
                                Contact us
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
