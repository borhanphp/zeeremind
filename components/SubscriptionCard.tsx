'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, Crown, TrendingUp, CreditCard } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { formatUsage } from '@/lib/subscription';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function SubscriptionCard() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const {
    subscription,
    loading,
    isPro,
    isExpired,
    isPastDue,
    invoicesRemaining,
    isApproachingLimit
  } = useSubscription(token || undefined);

  if (loading || !subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 flex items-center justify-center">
            <div className="animate-pulse text-sm text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const usagePercent = subscription.usage.unlimited
    ? 100
    : (subscription.usage.used / subscription.usage.limit) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Subscription
              {isPro && <Crown className="h-4 w-4 text-yellow-500" />}
            </CardTitle>
            <CardDescription>
              {isPro ? 'Pro Plan' : 'Free Plan'}
            </CardDescription>
          </div>
          <Badge variant={isPro ? 'default' : 'outline'}>
            {subscription.plan.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Past Due Warning */}
        {isPastDue && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900 dark:text-red-100">
                  Payment Failed
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                  Please update your payment method
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Expired Status */}
        {isExpired && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                  Subscription Expired
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                  Upgrade to Pro for unlimited invoices
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Usage Stats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Invoice Usage</span>
            <span className="text-sm text-muted-foreground">
              {formatUsage(subscription.usage)}
            </span>
          </div>

          {!subscription.usage.unlimited && (
            <>
              <Progress
                value={usagePercent}
                className={`h-2 ${isApproachingLimit ? 'bg-orange-100' : ''}`}
              />

              {isApproachingLimit && (
                <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Approaching your monthly limit
                </p>
              )}

              {invoicesRemaining !== null && invoicesRemaining <= 0 && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Limit reached - Upgrade for unlimited
                </p>
              )}
            </>
          )}

          {subscription.usage.unlimited && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Unlimited invoices on Pro plan
            </p>
          )}
        </div>

        {/* Billing Info for Pro */}
        {isPro && subscription.billing && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Next billing:</span>
              <span className="font-medium">
                {subscription.billing.nextBilledAt
                  ? new Date(subscription.billing.nextBilledAt).toLocaleDateString()
                  : 'N/A'
                }
              </span>
            </div>

            {subscription.billing.cancelAtPeriodEnd && (
              <p className="text-xs text-orange-600">
                Subscription will cancel on {new Date(subscription.billing.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Upgrade Recommendation */}
        {/* {subscription.upgradeRecommended && !isPro && (
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
            <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100 mb-1">
              Consider upgrading
            </p>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              You're using your free plan heavily. Pro gives you unlimited invoices.
            </p>
          </div>
        )} */}
      </CardContent>

      <CardFooter>
        {!isPro ? (
          <Link href="/upgrade" className="w-full">
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Button>
          </Link>
        ) : (
          <Link href="/settings/billing" className="w-full">
            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
