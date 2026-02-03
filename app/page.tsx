import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Mail, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="#">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stop chasing invoices. <br />
                  <span className="text-blue-400">Get paid automatically.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  We send polite, automated reminders to your clients so you don't have to.
                  Recover revenue without the awkward conversations.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login?signup=true">
                  <Button className="bg-white text-black hover:bg-gray-200" size="lg">
                    Start Free – Get Paid Faster
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Smart Timing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Reminders sent 3 days before, on due date, and after. Perfect timing, zero effort.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-3 bg-green-100 rounded-full">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Polite Follow-ups</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Professional templates that get you paid while keeping client relationships happy.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Set & Forget</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add an invoice once. We handle the rest until it's marked as paid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Why freelancers love us?
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Chasing money is stressful. Letting a bot do it is freedom.
                </p>
                <ul className="grid gap-4 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Recover 90% of overdue payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Save 5+ hours per month on admin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Look professional, not desperate</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login?signup=true">
                    <Button size="lg">Create your first Invoice</Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="bg-gray-100 p-8 rounded-xl border shadow-lg">
                  <div className="bg-white p-6 rounded shadow mb-4">
                    <div className="flex justify-between mb-4">
                      <div className="font-bold">INVOICE #1023</div>
                      <div className="text-red-500 font-bold">OVERDUE</div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">To: Acme Corp</div>
                    <div className="text-2xl font-bold mb-4">$1,250.00</div>
                    <div className="text-xs text-center bg-gray-50 p-2 rounded text-gray-400">
                      Auto-reminder sent 2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ready to get paid on time?
            </h2>
            <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl mb-8">
              Join thousands of freelancers who put their cashflow on autopilot.
            </p>
            <Link href="/login?signup=true">
              <Button className="bg-white text-blue-600 hover:bg-gray-100" size="lg">
                Start for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ZeeRemind. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
