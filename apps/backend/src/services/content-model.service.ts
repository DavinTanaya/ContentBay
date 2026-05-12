import { ContentModelRepository } from "../repositories/content-model.repo";

export class ContentModelService {
  static async findAll() {
    return ContentModelRepository.findAll();
  }

  static async findById(id: string) {
    return ContentModelRepository.findById(id);
  }

  static async create(input: any) {
    // Logic bisnis tambahan bisa diletakkan di sini sebelum masuk ke repo
    return ContentModelRepository.create(input);
  }

  static async update(id: string, input: any) {
    return ContentModelRepository.update(id, input);
  }

  static async delete(id: string) {
    return ContentModelRepository.delete(id);
  }
}
