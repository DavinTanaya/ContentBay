import type { User } from "@/entities/user";
import type { Workspace } from "@/entities/workspace";

export interface WorkspaceListProps {
  workspaces: Workspace[];
  onDelete: (id: string, name: string) => void;
  onAddClick: () => void;
  currentUser: User | null;
}