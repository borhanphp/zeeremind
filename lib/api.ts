const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    token?: string;
};

export const apiRequest = async (endpoint: string, options: RequestOptions = {}) => {
    const { method = 'GET', headers = {}, body, token } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (token) {
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${API_URL}${endpoint}`, config);
        const data = await res.json();

        if (res.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }

        if (!res.ok) {
            throw new Error(data.error || data.message || 'API Request Failed');
        }

        return data;
    } catch (err: any) {
        throw new Error(err.message || 'Network Error');
    }
};

