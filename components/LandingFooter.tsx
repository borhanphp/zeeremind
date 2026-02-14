import Link from "next/link";

export function LandingFooter() {
    return (
        <footer className="w-full py-12 bg-gray-900 text-gray-400">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-white font-semibold mb-3">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="mailto:support@zeeremind.com" className="hover:text-white transition-colors">support@zeeremind.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm">
                        © {new Date().getFullYear()} ZeeRemind. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500">
                        Built for freelancers, by freelancers.
                    </p>
                </div>
            </div>
        </footer>
    );
}
