export interface User {
  id: number;
  username: string;
  password?: string;
  role?: string;
}

export interface Patient {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  created_date?: string;
  updated_date?: string;
}

export interface TableData {
  [key: string]: any;
}

export interface DatabaseTable {
  name: string;
  columns: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}