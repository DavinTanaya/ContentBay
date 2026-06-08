import { ApiTokenRepository } from "../repositories/apiToken.repo";

export class ApiTokenService {
  static async findByWorkspace(workspaceId: string, userId: number) {
    return ApiTokenRepository.findByWorkspace(workspaceId, userId);
  }

  static async generate(workspaceId: string, name: string, userId: number) {
    return ApiTokenRepository.generate(workspaceId, name, userId);
  }

  static async revoke(tokenId: string, userId: number) {
    return ApiTokenRepository.revoke(tokenId, userId);
  }

  static async regenerate(tokenId: string, userId: number) {
    return ApiTokenRepository.regenerate(tokenId, userId);
  }
}
