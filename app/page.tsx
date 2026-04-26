import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Mail,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeeRemind - Automated Invoice Reminders | Get Paid Faster",
  description:
    "Stop chasing invoices. ZeeRemind sends automated email reminders so you get paid on time. Free plan available.",
  openGraph: {
    title: "ZeeRemind - Automated Invoice Reminders",
    description: "Automated email reminders. Set it once, get paid on time.",
    url: "https://zeeremind.com",
    siteName: "ZeeRemind",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-950">
      <LandingHeader />

      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                Automated email reminders for client invoices
                <ChevronRight className="h-3.5 w-3.5" />
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Stop chasing invoices.{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Get paid automatically.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-lg">
                  Automated payment reminders via email so you never have to chase
                  clients again. Set it once, get paid on time.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/login?signup=true">
                  <Button
                    size="lg"
                    className="px-8 bg-amber-50 text-base text-gray-900 shadow-xl shadow-white/10 hover:bg-gray-100"
                  >
                    Start Free - No Card Required
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="lg"
                    className="border border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                Free plan includes 3 invoices - No credit card required
              </p>
            </div>
          </div>
        </section>

        <section className="w-full border-b border-gray-100 bg-gray-50 py-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-8 text-sm text-gray-500 sm:flex-row">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500 text-[10px] font-bold text-white dark:border-gray-900"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by freelancers and agencies</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">Loved by early users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure and private</span>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                How It Works
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get paid in 3 simple steps
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Add Your Invoice",
                  description:
                    "Enter client details, amount, and due date. Takes 30 seconds.",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  step: "2",
                  title: "Set The Schedule",
                  description:
                    "Pick when reminders should go out before and after the due date.",
                  gradient: "from-indigo-500 to-indigo-600",
                },
                {
                  step: "3",
                  title: "Get Paid Automatically",
                  description:
                    "We send polite email reminders before, on, and after the due date until paid.",
                  gradient: "from-violet-500 to-violet-600",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center space-y-4 p-8 text-center"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-lg font-bold text-white shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-gray-50 py-20 md:py-28 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Features
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to get paid faster
              </h2>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Smart Timing",
                  description:
                    "Reminders sent 3 days before, on due date, and after - perfect timing, zero effort.",
                  color: "blue",
                },
                {
                  icon: <Mail className="h-6 w-6" />,
                  title: "Email Reminders",
                  description:
                    "Professional email templates that get you paid while keeping client relationships happy.",
                  color: "green",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Set and Forget",
                  description:
                    "Add an invoice once. We handle the rest until it is marked as paid.",
                  color: "purple",
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Instant Manual Reminders",
                  description:
                    "Need to nudge a client right now? One click sends an email reminder.",
                  color: "rose",
                },
                {
                  icon: <CheckCircle className="h-6 w-6" />,
                  title: "Payment Link Tracking",
                  description:
                    "Keep every reminder tied to a payment link so clients have a clear next step.",
                  color: "emerald",
                },
                {
                  icon: <Mail className="h-6 w-6" />,
                  title: "Polite Templates",
                  description:
                    "Stay professional with friendly copy that keeps collections consistent without sounding harsh.",
                  color: "amber",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative flex flex-col space-y-3 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/50"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${feature.color}-100 text-${feature.color}-600 dark:bg-${feature.color}-900/30`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Why ZeeRemind?
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Chasing money is stressful.
                  <br />
                  <span className="text-gray-400">Letting us do it is freedom.</span>
                </h2>
                <ul className="grid gap-4 py-4">
                  {[
                    "Get paid faster with automated follow-ups",
                    "Save 5+ hours per month on admin work",
                    "Look professional, not desperate",
                    "Keep follow-up simple with email-first reminders",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login?signup=true">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Create Your First Invoice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="mx-auto w-full max-w-[480px] lg:max-w-none">
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-5 flex items-start justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-400">
                          Invoice
                        </div>
                        <div className="text-lg font-bold">#INV-1023</div>
                      </div>
                      <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
                        OVERDUE
                      </span>
                    </div>
                    <div className="mb-1 text-sm text-gray-500">To: Acme Corp</div>
                    <div className="mb-6 text-3xl font-bold">$1,250.00</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-lg bg-green-50 p-2.5 text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email reminder sent 2 hours ago</span>
                        <CheckCircle className="ml-auto h-3.5 w-3.5" />
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2.5 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Next reminder scheduled for tomorrow</span>
                        <CheckCircle className="ml-auto h-3.5 w-3.5" />
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Automatic follow-up stays active until paid</span>
                        <CheckCircle className="ml-auto h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-50 py-20 md:py-28 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Pricing
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-500">
                Start free, upgrade when you grow. No hidden fees, cancel anytime.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-1 text-xl font-bold">Free</h3>
                <p className="mb-5 text-sm text-gray-500">Perfect to get started</p>
                <div className="mb-6 text-4xl font-bold">
                  $0<span className="text-base font-normal text-gray-400">/mo</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3 text-sm">
                  {[
                    "3 invoices (lifetime)",
                    "Email reminders",
                    "Automated schedule",
                    "Payment link tracking",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login?signup=true" className="w-full">
                  <Button className="w-full" variant="outline">
                    Get Started for Free
                  </Button>
                </Link>
              </div>

              <div className="relative flex flex-col rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-xl shadow-blue-500/10 dark:bg-gray-800">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
                <h3 className="mb-1 text-xl font-bold">Pro</h3>
                <p className="mb-5 text-sm text-gray-500">For growing businesses</p>
                <div className="mb-6 text-4xl font-bold">
                  $19<span className="text-base font-normal text-gray-400">/mo</span>
                </div>
                <p className="mb-6 text-sm text-gray-500">or $179/year (save 21%)</p>
                <ul className="mb-8 flex-1 space-y-3 text-sm">
                  {[
                    "Unlimited invoices",
                    "Unlimited email reminders",
                    "Priority support",
                    "Remove branding",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login?signup=true&plan=pro" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                    Get Started with Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Testimonials
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What our users say
              </h2>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah K.",
                  role: "Freelance Designer",
                  quote:
                    "I used to spend hours following up on invoices. ZeeRemind handles it all, and I just focus on design now.",
                },
                {
                  name: "Mike R.",
                  role: "Web Developer",
                  quote:
                    "I stopped rewriting follow-up emails every week. The reminders keep going out and invoices get paid.",
                },
                {
                  name: "Priya M.",
                  role: "Marketing Consultant",
                  quote:
                    "Simple, effective, and affordable. Exactly what I needed to stop chasing late payments.",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <div className="text-sm font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

          <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get paid on time?
            </h2>
            <p className="mx-auto mb-8 max-w-[600px] text-blue-100 md:text-xl">
              Join freelancers who put their cash flow on autopilot. Start free
              today.
            </p>
            <Link href="/login?signup=true">
              <Button
                size="lg"
                className="px-8 text-base text-blue-600 shadow-xl shadow-black/10 hover:bg-gray-100"
              >
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
