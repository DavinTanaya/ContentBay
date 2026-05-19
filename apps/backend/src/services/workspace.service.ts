import { WorkspaceRepository } from "../repositories/workspace.repo";

export class WorkspaceService {
  static async findAll(userId: number) {
    return WorkspaceRepository.findAll(userId);
  }

  static async findById(id: string, userId: number) {
    return WorkspaceRepository.findById(id, userId);
  }

  static async create(input: { name: string; description?: string }, userId: number) {
    return WorkspaceRepository.create(input, userId);
  }

  static async update(id: string, name: string, userId: number) {
    return WorkspaceRepository.update(id, name, userId);
  }

  static async delete(id: string, userId: number) {
    return WorkspaceRepository.delete(id, userId);
  }
}
