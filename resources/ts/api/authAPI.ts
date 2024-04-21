import axios from './axios';
import type { User } from '@/types/User'

// CSRF トークンを初期化する関数
export const initializeAuth = async (): Promise<void> => {
    await axios.get("/sanctum/csrf-cookie");
};

// ログイン関数 response.data;
export const login = async (credentials: { email: string, password: string }): Promise<User> => {
    await initializeAuth(); // CSRFトークンを取得
    const { data } = await axios.post<User>('/login-api', credentials);
    return data;
};


// ユーザー情報を取得する関数
export const getUser = async (): Promise<User> => {
    await initializeAuth(); // CSRFトークンを取得
    const response = await axios.get<User>('/api/me');
    return response.data;
};

// ログアウト関数
export const logout = async (): Promise<void> => {
    await initializeAuth(); // CSRFトークンを取得
    await axios.post('/logout-api');
};
