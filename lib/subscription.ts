import { apiRequest } from './api';

export interface SubscriptionStatus {
  plan: 'free' | 'pro';
  status: 'active' | 'expired' | 'cancelled' | 'past_due'; // 'trial' removed - free users get 3 invoices lifetime
  features: {
    maxInvoices: number;
    emailReminders: boolean;
    smsReminders: boolean;
    whatsappReminders: boolean;
    basicReporting: boolean;
    automatedSchedule: boolean;
    prioritySupport: boolean;
    removeBranding: boolean;
  };
  usage: {
    used: number;
    limit: number;
    remaining: number;
    unlimited: boolean;
  };
  trial?: {
    daysRemaining: number;
    endsAt: string;
  };
  billing?: {
    currentPeriodEnd: string;
    nextBilledAt: string;
    billingCycle: {
      interval: string;
      frequency: number;
    };
    cancelAtPeriodEnd: boolean;
  };
  upgradeRecommended: boolean;
  upgradeReason?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: {
    maxInvoices: number;
    emailReminders: boolean;
    smsReminders: boolean;
    whatsappReminders: boolean;
    basicReporting: boolean;
    automatedSchedule: boolean;
    prioritySupport: boolean;
    removeBranding: boolean;
  };
}

export interface BillingTransaction {
  id: string;
  status: string;
  amount: string;
  currency: string;
  createdAt: string;
  billedAt: string;
  invoiceNumber?: string;
  receiptUrl?: string;
}

/**
 * Get current subscription status
 */
export const getSubscriptionStatus = async (token: string): Promise<SubscriptionStatus> => {
  const response = await apiRequest('/subscription/status', {
    token,
  });
  return response.data;
};

/**
 * Get available plans
 */
export const getPlans = async (): Promise<Plan[]> => {
  const response = await apiRequest('/subscription/plans');
  return response.data;
};

/**
 * Create checkout session for upgrade (works with any active processor)
 */
export const createCheckout = async (token: string, plan: string, billingCycle?: string): Promise<{
  type: 'client' | 'redirect';
  processor: 'paddle' | 'polar';
  data: {
    // Paddle fields
    priceId?: string;
    customerEmail?: string;
    customData?: { userId: string; organizationId: string };
    // Polar fields
    checkoutUrl?: string;
    checkoutId?: string;
  };
}> => {
  const response = await apiRequest('/payment/checkout', {
    method: 'POST',
    token,
    body: { plan, billingCycle: billingCycle || 'monthly' },
  });
  return response.data;
};

/**
 * Cancel subscription (via active processor)
 */
export const cancelSubscription = async (token: string): Promise<void> => {
  await apiRequest('/payment/cancel', {
    method: 'POST',
    token,
  });
};

/**
 * Get billing history
 */
export const getBillingHistory = async (token: string): Promise<BillingTransaction[]> => {
  const response = await apiRequest('/subscription/billing-history', {
    token,
  });
  return response.data;
};

/**
 * Get usage statistics
 */
export const getUsageStats = async (token: string) => {
  const response = await apiRequest('/subscription/usage', {
    token,
  });
  return response.data;
};

/**
 * Check if feature is available
 */
export const checkFeature = async (token: string, featureName: string): Promise<boolean> => {
  const response = await apiRequest(`/subscription/check-feature/${featureName}`, {
    token,
  });
  return response.data.hasAccess;
};

/**
 * Get billing portal URL (via active processor)
 */
export const getBillingPortalUrl = async (token: string): Promise<string> => {
  const response = await apiRequest('/payment/portal-url', {
    token,
  });
  return response.data.portalUrl;
};

/**
 * Initialize Paddle
 */
export const initPaddle = (vendorId?: string) => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
  script.async = true;

  script.onload = () => {
    if (vendorId && (window as any).Paddle) {
      (window as any).Paddle.Initialize({
        token: vendorId,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
      });
    }
  };

  document.head.appendChild(script);
};

/**
 * Format plan price
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Format usage display
 */
export const formatUsage = (usage: SubscriptionStatus['usage']): string => {
  if (usage.unlimited) {
    return `${usage.used} invoices (Unlimited)`;
  }
  return `${usage.used}/${usage.limit} invoices used`;
};
