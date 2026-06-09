import { WorkspaceRepository } from "../repositories/workspace.repo";
import mailerService from "./mailer.service";

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

  static async update(id: string, input: { name?: string; description?: string }, userId: number) {
    return WorkspaceRepository.update(id, input, userId);
  }

  static async delete(id: string, userId: number) {
    return WorkspaceRepository.delete(id, userId);
  }

  static async inviteMember(workspaceId: string, email: string, role: string, userId: number) {
    const { token } = await WorkspaceRepository.inviteMember(workspaceId, email, role, userId);
    
    try {
      const workspace = await WorkspaceRepository.findById(workspaceId, userId);
      const workspaceName = workspace?.name || 'ContentBay Workspace';
      await mailerService.sendInvitationEmail(email, workspaceName, role, token);
    } catch (error) {
      console.error('Failed to send invitation email:', error);
    }
    
    return true;
  }

  static async acceptInvitation(token: string, userId: number) {
    return WorkspaceRepository.acceptInvitation(token, userId);
  }

  static async getInvitationDetails(token: string) {
    return WorkspaceRepository.getInvitationDetails(token);
  }

  static async getMyPendingInvitations(userId: number) {
    return WorkspaceRepository.getMyPendingInvitations(userId);
  }

  static async declineInvitation(id: string, userId: number) {
    return WorkspaceRepository.declineInvitation(id, userId);
  }
}
