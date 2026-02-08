import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
    return (
        <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white dark:bg-gray-800">
                <Link className="flex items-center justify-center font-bold text-xl" href="/">
                    ZeeRemind
                </Link>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter">Refund Policy</h1>
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <h2 className="text-xl font-semibold">1. Subscription Refunds</h2>
                        <p>
                            ZeeRemind offers a 14-day money-back guarantee for all new subscriptions. If you are not satisfied with our service for any reason, you may request a full refund within 14 days of your initial purchase.
                        </p>

                        <h2 className="text-xl font-semibold">2. Recurring Charges</h2>
                        <p>
                            For recurring subscription charges, we do not provide refunds for partial months or years. If you cancel your subscription, you will continue to have access to the service until the end of your current billing period.
                        </p>

                        <h2 className="text-xl font-semibold">3. Exceptions</h2>
                        <p>
                            We reserve the right to refuse a refund if we believe there has been abuse of our refund policy or a violation of our Terms of Service.
                        </p>

                        <h2 className="text-xl font-semibold">4. How to Request a Refund</h2>
                        <p>
                            To request a refund, please contact our support team at support@zeeremind.com with your account details and the reason for your request. We will review your request and process it within 5-7 business days.
                        </p>

                        <h2 className="text-xl font-semibold">5. Changes to Refund Policy</h2>
                        <p>
                            We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to the website.
                        </p>
                    </div>
                </div>
            </main>
        </div>

    );
}
