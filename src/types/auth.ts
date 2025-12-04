export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  emailVerified: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullName: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

