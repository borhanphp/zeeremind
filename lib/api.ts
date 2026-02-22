const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const REQUEST_TIMEOUT_MS = 30_000; // 30 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    token?: string;
    retries?: number;
    timeout?: number;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiRequest = async (endpoint: string, options: RequestOptions = {}): Promise<any> => {
    const {
        method = 'GET',
        headers = {},
        body,
        token,
        retries = method === 'GET' ? MAX_RETRIES : 0, // Only retry idempotent requests
        timeout = REQUEST_TIMEOUT_MS
    } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        signal: AbortSignal.timeout(timeout),
    };

    if (token) {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, config);

            // Handle 401 - redirect to login
            if (res.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                throw new Error('Session expired. Please log in again.');
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || 'API Request Failed');
            }

            return data;
        } catch (err: any) {
            lastError = err;

            // Don't retry on auth errors or client errors
            if (err.message?.includes('Session expired') || err.name === 'AbortError') {
                break;
            }

            // Retry on network errors or 5xx
            if (attempt < retries) {
                await sleep(RETRY_DELAY_MS * (attempt + 1)); // Linear backoff
                continue;
            }
        }
    }

    if (lastError?.name === 'TimeoutError' || lastError?.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection and try again.');
    }

    throw new Error(lastError?.message || 'Network Error');
};
