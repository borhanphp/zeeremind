import Link from "next/link";
import { User, CreditCard, Shield, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    const settingsItems = [
        {
            title: "Profile",
            description: "Manage your personal information and preferences.",
            href: "/profile",
            icon: User,
        },
        {
            title: "Billing & Subscription",
            description: "Manage your subscription plan and payment methods.",
            href: "/settings/billing",
            icon: CreditCard,
        },
        {
            title: "Security",
            description: "Update your password and security settings.",
            href: "/settings/security",
            icon: Shield,
        },
    ];

    return (
        <div className="container max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
            <div className="grid gap-6">
                {settingsItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-medium flex items-center gap-3">
                                    <item.icon className="h-5 w-5 text-muted-foreground" />
                                    {item.title}
                                </CardTitle>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="ml-8">{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
