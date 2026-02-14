import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";

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
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <h2 className="text-xl font-semibold">1. Right of Withdrawal</h2>
                        <p>
                            You have the right to withdraw from your subscription contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day of the conclusion of the contract.
                        </p>

                        <h2 className="text-xl font-semibold">2. How to Exercise Your Right</h2>
                        <p>
                            To exercise the right of withdrawal, you must inform us of your decision to withdraw from this contract by an unequivocal statement (e.g., a letter sent by post or email). You may use the attached model withdrawal form, but it is not obligatory.
                        </p>
                        <p>
                            To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.
                            Please contact us at support@zeeremind.com.
                        </p>

                        <h2 className="text-xl font-semibold">3. Effects of Withdrawal</h2>
                        <p>
                            If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.
                        </p>
                        <p>
                            We will carry out such reimbursement using the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise; in any event, you will not incur any fees as a result of such reimbursement.
                        </p>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>

    );
}
