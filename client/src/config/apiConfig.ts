export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
    auth: {
        register: `${API_BASE_URL}/api/auth/signup`,
        login: `${API_BASE_URL}/api/auth/login`,
        logout: `${API_BASE_URL}/api/auth/logout`,
        me: `${API_BASE_URL}/api/user/`,
    },
    tasks: {
        list: `${API_BASE_URL}/api/todos`,
        create: `${API_BASE_URL}/api/todos`,
        update: (id: string) => `${API_BASE_URL}/api/todos/${id}`,
        delete: (id: string) => `${API_BASE_URL}/api/todos/${id}`,
        toggle: (id: string) => `${API_BASE_URL}/api/todos/toggle/${id}`,
    },
    user: {
        profile: `${API_BASE_URL}/api/user/`,
    },
};
