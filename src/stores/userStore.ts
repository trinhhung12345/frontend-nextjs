// src/stores/userStore.ts
import { create } from 'zustand';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
};

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    // Thêm các actions khác ở đây sau này (logout, fetchUser...)
};

export const useUserStore = create<UserState>((set) => ({
    user: null, // Ban đầu chưa có user
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
}));