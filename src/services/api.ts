import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    login: async (data: any) => {
        const response = await api.post('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

// Video API
export const videoAPI = {
    getAll: async () => {
        const response = await api.get('/videos');
        return response.data;
    },

    getOne: async (id: any) => {
        const response = await api.get(`/videos/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/videos', data);
        return response.data;
    },

    update: async (id: any, data: any) => {
        const response = await api.put(`/videos/${id}`, data);
        return response.data;
    },

    delete: async (id: any) => {
        const response = await api.delete(`/videos/${id}`);
        return response.data;
    },
};

// Plan API
export const planAPI = {
    getAll: async () => {
        const response = await api.get('/plans');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/plans', data);
        return response.data;
    },

    update: async (id: any, data: any) => {
        const response = await api.put(`/plans/${id}`, data);
        return response.data;
    },

    delete: async (id: any) => {
        const response = await api.delete(`/plans/${id}`);
        return response.data;
    },
};

// Order API
export const orderAPI = {
    getAll: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/orders/my');
        return response.data;
    },

    getOne: async (id: any) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/orders', data);
        return response.data;
    },
};

// Proxy API (Admin only)
export const proxyAPI = {
    getAll: async () => {
        const response = await api.get('/proxies');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/proxies', data);
        return response.data;
    },

    update: async (id: any, data: any) => {
        const response = await api.put(`/proxies/${id}`, data);
        return response.data;
    },

    delete: async (id: any) => {
        const response = await api.delete(`/proxies/${id}`);
        return response.data;
    },
};

export default api;
