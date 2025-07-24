export function apiFetch(url, options = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('pies-token') : null;
    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(url, { ...options, headers });
}