import type { User } from "@/entities/user";
import type { Workspace } from "@/entities/workspace";

export interface WorkspaceListProps {
  workspaces: Workspace[];
  onAddClick: () => void;
  currentUser: User | null;
  loading?: boolean;
}