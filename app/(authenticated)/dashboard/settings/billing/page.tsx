'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Download, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  Crown,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSubscription } from '@/hooks/useSubscription';
import { getBillingHistory, cancelSubscription, getBillingPortalUrl } from '@/lib/subscription';
import Link from 'next/link';

export default function BillingPage() {
  const [token, setToken] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const { subscription, loading, isPro, refresh } = useSubscription(token || undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) return;

      try {
        const data = await getBillingHistory(token);
        setTransactions(data);
      } catch (err: any) {
        console.error('Failed to fetch billing history:', err);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleCancelSubscription = async () => {
    if (!token) return;

    setLoadingCancel(true);
    setError(null);

    try {
      await cancelSubscription(token);
      setSuccess('Subscription cancelled. You will have access until the end of your billing period.');
      refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to cancel subscription');
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleOpenPortal = async () => {
    if (!token) return;

    setLoadingPortal(true);
    try {
      const portalUrl = await getBillingPortalUrl(token);
      window.open(portalUrl, '_blank');
    } catch (err: any) {
      setError(err.message || 'Failed to open billing portal');
    } finally {
      setLoadingPortal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-900">{success}</AlertDescription>
          </Alert>
        )}

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Plan
                  {isPro && <Crown className="h-5 w-5 text-yellow-500" />}
                </CardTitle>
                <CardDescription>
                  Your current subscription details
                </CardDescription>
              </div>
              <Badge variant={isPro ? 'default' : 'secondary'} className="text-lg px-4 py-1">
                {subscription?.plan === 'pro' ? 'Pro' : 'Free'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={
                  subscription?.status === 'active' ? 'default' :
                  subscription?.status === 'trial' ? 'secondary' :
                  subscription?.status === 'past_due' ? 'destructive' :
                  'outline'
                }>
                  {subscription?.status}
                </Badge>
              </div>

              {subscription?.billing?.nextBilledAt && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Next Billing Date
                  </p>
                  <p className="font-medium">
                    {new Date(subscription.billing.nextBilledAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {isPro && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price
                  </p>
                  <p className="font-medium">$9.00 USD / month</p>
                </div>
              )}
            </div>

            {subscription?.billing?.cancelAtPeriodEnd && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-900">
                  Your subscription will cancel on {' '}
                  {new Date(subscription.billing.currentPeriodEnd).toLocaleDateString()}
                </AlertDescription>
              </Alert>
            )}

            <Separator />

            <div className="flex flex-wrap gap-3">
              {!isPro ? (
                <Link href="/pricing">
                  <Button>
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleOpenPortal}
                    disabled={loadingPortal}
                  >
                    {loadingPortal ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ExternalLink className="mr-2 h-4 w-4" />
                    )}
                    Billing Portal
                  </Button>

                  {!subscription?.billing?.cancelAtPeriodEnd && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={loadingCancel}>
                          Cancel Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Your Pro subscription will remain active until the end of your current billing period.
                            After that, you'll be downgraded to the Free plan (5 invoices per month).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancelSubscription}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {loadingCancel ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Confirm Cancellation
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No billing history yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {tx.invoiceNumber || tx.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{tx.amount} {tx.currency}</p>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </div>
                      {tx.receiptUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(tx.receiptUrl, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
