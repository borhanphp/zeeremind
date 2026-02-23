import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  Shield,
  Smartphone,
  MessageSquare,
  Zap,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeeRemind - Automated Invoice Reminders | Get Paid Faster",
  description:
    "Stop chasing invoices. ZeeRemind sends automated payment reminders via Email, SMS & WhatsApp so you get paid on time. Free plan available.",
  openGraph: {
    title: "ZeeRemind - Automated Invoice Reminders",
    description:
      "Automated payment reminders via Email, SMS & WhatsApp. Set it once, get paid on time.",
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
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm text-blue-200">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                Now with SMS & WhatsApp reminders
                <ChevronRight className="h-3.5 w-3.5" />
              </div>

              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Stop chasing invoices.{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Get paid automatically.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-lg">
                  Automated payment reminders via Email, SMS & WhatsApp — so you
                  never have to chase clients again. Set it once, get paid on time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login?signup=true">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/10 text-base px-8"
                  >
                    Start Free — No Card Required
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="lg"
                    className="bg-transparent border border-white/30 text-white hover:bg-white/10 text-base px-8"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                Free plan includes 3 invoices · No credit card required
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="w-full py-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-white font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by freelancers & agencies</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1">Loved by early users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                How It Works
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get paid in 3 simple steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                  title: "Choose Channels",
                  description:
                    "Pick Email, SMS, or WhatsApp. We'll reach clients wherever they are.",
                  gradient: "from-indigo-500 to-indigo-600",
                },
                {
                  step: "3",
                  title: "Get Paid Automatically",
                  description:
                    "We send polite reminders before, on, and after due date until paid.",
                  gradient: "from-violet-500 to-violet-600",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative flex flex-col items-center text-center space-y-4 p-8"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Features
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to get paid faster
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Smart Timing",
                  description:
                    "Reminders sent 3 days before, on due date, and after — perfect timing, zero effort.",
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
                  icon: <Smartphone className="h-6 w-6" />,
                  title: "SMS Reminders",
                  description:
                    "Reach clients instantly via text message. Higher open rates than email.",
                  color: "amber",
                  badge: "PRO",
                },
                {
                  icon: <MessageSquare className="h-6 w-6" />,
                  title: "WhatsApp Reminders",
                  description:
                    "Send reminders via WhatsApp — the channel your clients already use daily.",
                  color: "emerald",
                  badge: "PRO",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Set & Forget",
                  description:
                    "Add an invoice once. We handle the rest until it's marked as paid.",
                  color: "purple",
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Instant Manual Reminders",
                  description:
                    "Need to nudge a client right now? One click sends across all channels.",
                  color: "rose",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative flex flex-col space-y-3 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center text-${feature.color}-600`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    {feature.badge && (
                      <span className="text-[10px] font-bold bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800 px-2 py-0.5 rounded-full">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
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
                    "Reach clients via Email, SMS, or WhatsApp",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login?signup=true">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                  >
                    Create Your First Invoice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Invoice Mockup */}
              <div className="mx-auto w-full max-w-[480px] lg:max-w-none">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Invoice</div>
                        <div className="font-bold text-lg">#INV-1023</div>
                      </div>
                      <span className="text-xs font-bold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                        OVERDUE
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">To: Acme Corp</div>
                    <div className="text-3xl font-bold mb-6">$1,250.00</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs bg-green-50 dark:bg-green-900/20 p-2.5 rounded-lg text-green-700 dark:text-green-400">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email reminder sent 2 hours ago</span>
                        <CheckCircle className="h-3.5 w-3.5 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg text-blue-700 dark:text-blue-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp reminder sent 2 hours ago</span>
                        <CheckCircle className="h-3.5 w-3.5 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-lg text-amber-700 dark:text-amber-400">
                        <Smartphone className="h-3.5 w-3.5" />
                        <span>SMS reminder scheduled for tomorrow</span>
                        <Clock className="h-3.5 w-3.5 ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="w-full py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Pricing
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Start free, upgrade when you grow. No hidden fees, cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-1">Free</h3>
                <p className="text-sm text-gray-500 mb-5">Perfect to get started</p>
                <div className="text-4xl font-bold mb-6">
                  $0<span className="text-base font-normal text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {[
                    "3 invoices (lifetime)",
                    "Email reminders",
                    "Automated schedule",
                    "Payment link tracking",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
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

              {/* Pro Plan */}
              <div className="flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-600 relative shadow-xl shadow-blue-500/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-sm text-gray-500 mb-5">For growing businesses</p>
                <div className="text-4xl font-bold mb-6">
                  $19<span className="text-base font-normal text-gray-400">/mo</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">or $179/year (save 21%)</p>
                <ul className="space-y-3 text-sm mb-8 flex-1">
                  {[
                    "Unlimited invoices",
                    "Email reminders",
                    "SMS reminders",
                    "WhatsApp reminders",
                    "Priority support",
                    "Remove branding",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login?signup=true&plan=pro" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    Get Started with Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Testimonials
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What our users say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Sarah K.",
                  role: "Freelance Designer",
                  quote:
                    "I used to spend hours following up on invoices. ZeeRemind handles it all — I just focus on design now.",
                },
                {
                  name: "Mike R.",
                  role: "Web Developer",
                  quote:
                    "The WhatsApp reminders are a game changer. My clients respond within minutes instead of days.",
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
                  className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

          <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4">
              Ready to get paid on time?
            </h2>
            <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl mb-8">
              Join freelancers who put their cashflow on autopilot.
              Start free today.
            </p>
            <Link href="/login?signup=true">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl shadow-black/10 text-base px-8"
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
