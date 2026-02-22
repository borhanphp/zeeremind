import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - ZeeRemind",
    description:
        "ZeeRemind Terms of Service. Read about the terms and conditions for using the ZeeRemind automated invoice reminder platform.",
};

export default function TermsOfService() {
    return (
        <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
            <LandingHeader />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter">Terms of Service</h1>
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using ZeeRemind, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>

                        <h2 className="text-xl font-semibold">2. Description of Service</h2>
                        <p>
                            ZeeRemind provides automated invoice reminder services. You are responsible for obtaining access to the service, which may involve third-party fees (such as Internet service provider or airtime charges).
                        </p>

                        <h2 className="text-xl font-semibold">3. User Account</h2>
                        <p>
                            To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                        </p>

                        <h2 className="text-xl font-semibold">4. Payments and Subscriptions</h2>
                        <p>
                            Some parts of the Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
                        </p>

                        <h2 className="text-xl font-semibold">5. Termination</h2>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>

                        <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
                        <p>
                            In no event shall ZeeRemind, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                        </p>

                        <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>

                        <h2 className="text-xl font-semibold">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at support@zeeremind.com.
                        </p>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>

    );
}
