const API_BASE_URL = 'http://localhost:5000/api';

export const fetchNews = async () => {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
};

export const createNews = async (data) => {
    const res = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create news');
    }
    return res.json();
};
