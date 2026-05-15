import type { User } from '@/entities/user';

export interface AuthPayload {
  token: string;
  user: User;
}

export interface ManualLoginResponseDto {
  login: AuthPayload;
}

export interface LoginResponseDto {
  googleLoginWithAccessToken: AuthPayload;
}

export interface GoogleLoginResponseDto {
  googleLogin: AuthPayload;
}

export interface RegisterResponseDto {
  register: AuthPayload;
}
