import { ContentRepository } from "../repositories/content.repo";

export class ContentService {
  static async findAll(workspaceId: string, contentModelId?: string) {
    return ContentRepository.findAll(workspaceId, contentModelId);
  }

  static async findById(id: string) {
    return ContentRepository.findById(id);
  }

  static async create(input: any) {
    return ContentRepository.create(input);
  }

  static async update(id: string, input: any) {
    return ContentRepository.update(id, input);
  }

  static async delete(id: string) {
    return ContentRepository.delete(id);
  }
}
