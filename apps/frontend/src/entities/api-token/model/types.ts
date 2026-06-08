export interface ApiToken {
  id: string;
  name: string;
  tokenPrefix: string;
  createdAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}

export interface GenerateTokenResponse {
  token: ApiToken;
  plainTextToken: string;
}
