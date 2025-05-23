import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'faculty' | 'incharge' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Faculty User',
    email: 'faculty@example.com',
    password: 'password123',
    role: 'faculty' as UserRole,
    department: 'CSE'
  },
  {
    id: '2',
    name: 'Incharge User',
    email: 'incharge@example.com',
    password: 'password123',
    role: 'incharge' as UserRole,
    department: 'CSE'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    department: 'Admin'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        // In a real app, this would be an API call
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            isAuthenticated: true,
            user: userWithoutPassword,
            token: 'mock-jwt-token'
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);