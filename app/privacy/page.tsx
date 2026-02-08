import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
                    <h1 className="text-3xl font-bold tracking-tighter">Privacy Policy</h1>
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <h2 className="text-xl font-semibold">1. Information Collection</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, subscribe to our service, or request customer support. This information may include your name, email address, payment information, and details about your invoices.
                        </p>

                        <h2 className="text-xl font-semibold">2. Use of Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, including to send you technical notices, updates, security alerts, and support messages. We also use it to send you automated invoice reminders on your behalf.
                        </p>

                        <h2 className="text-xl font-semibold">3. Data Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>

                        <h2 className="text-xl font-semibold">4. Sharing of Information</h2>
                        <p>
                            We do not share your personal information with third parties except as described in this policy. We may share your information with third-party service providers who need access to such information to carry out work on our behalf.
                        </p>

                        <h2 className="text-xl font-semibold">5. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>

                        <h2 className="text-xl font-semibold">6. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>

                        <h2 className="text-xl font-semibold">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at support@zeeremind.com.
                        </p>
                    </div>
                </div>
            </main>
        </div>

    );
}
