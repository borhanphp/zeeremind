import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy - ZeeRemind",
    description:
        "ZeeRemind refund policy. All payments are processed by Paddle as our Merchant of Record. Refunds are handled according to Paddle's refund policy.",
};

export default function RefundPolicy() {
    return (
        <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
            <LandingHeader />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter">Refund Policy</h1>
                    <p className="text-sm text-gray-500">Last updated: February 22, 2026</p>

                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <h2 className="text-xl font-semibold">1. Payment Processing</h2>
                        <p>
                            All payments for ZeeRemind subscriptions are processed by{" "}
                            <a href="https://www.paddle.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Paddle.com
                            </a>
                            , which acts as our Merchant of Record. This means Paddle handles all payment processing, invoicing, sales tax, and refunds on our behalf.
                        </p>

                        <h2 className="text-xl font-semibold">2. Refund Policy</h2>
                        <p>
                            Since Paddle is the Merchant of Record for all ZeeRemind transactions, all refunds are processed in accordance with Paddle&apos;s refund policy. If you are unsatisfied with your purchase for any reason, you may request a refund by contacting us or by contacting Paddle directly.
                        </p>

                        <h2 className="text-xl font-semibold">3. How to Request a Refund</h2>
                        <p>
                            To request a refund, you can:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                Email us at{" "}
                                <a href="mailto:support@zeeremind.com" className="text-blue-600 hover:underline">
                                    support@zeeremind.com
                                </a>{" "}
                                with your order details and we will process your refund request through Paddle.
                            </li>
                            <li>
                                Contact Paddle directly through the receipt email you received when you made your purchase.
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold">4. Paddle&apos;s Buyer Refund Policy</h2>
                        <p>
                            For full details on refund eligibility, timelines, and processing, please refer to{" "}
                            <a href="https://www.paddle.com/legal/buyer-terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Paddle&apos;s Buyer Terms
                            </a>
                            .
                        </p>

                        <h2 className="text-xl font-semibold">5. Contact Us</h2>
                        <p>
                            If you have any questions about refunds or need assistance, please contact us at{" "}
                            <a href="mailto:support@zeeremind.com" className="text-blue-600 hover:underline">
                                support@zeeremind.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
