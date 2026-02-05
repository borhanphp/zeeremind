import { useState, useEffect, useCallback } from 'react';
import { getSubscriptionStatus, SubscriptionStatus } from '@/lib/subscription';

export const useSubscription = (token?: string) => {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionStatus(token);
      setSubscription(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch subscription');
      console.error('Subscription fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const refresh = () => {
    fetchSubscription();
  };

  // Helper methods
  const isPro = subscription?.plan === 'pro';
  const isFree = subscription?.plan === 'free';
  const isActive = subscription?.status === 'active';
  const isTrial = subscription?.status === 'trial';
  const isExpired = subscription?.status === 'expired';
  const isPastDue = subscription?.status === 'past_due';

  const canUpgrade = isFree || isExpired || isTrial;
  
  const hasFeature = (featureName: keyof SubscriptionStatus['features']) => {
    return subscription?.features[featureName] === true;
  };

  const invoicesRemaining = subscription?.usage?.remaining ?? 0;
  const isApproachingLimit = !subscription?.usage?.unlimited && 
    subscription?.usage?.used !== undefined &&
    subscription?.usage?.limit !== undefined &&
    subscription.usage.used >= (subscription.usage.limit * 0.8);

  return {
    subscription,
    loading,
    error,
    refresh,
    // Helper flags
    isPro,
    isFree,
    isActive,
    isTrial,
    isExpired,
    isPastDue,
    canUpgrade,
    hasFeature,
    invoicesRemaining,
    isApproachingLimit,
  };
};
