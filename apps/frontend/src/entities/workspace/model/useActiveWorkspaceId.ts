import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function useActiveWorkspaceId() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const activeSpaceId = workspaceId || localStorage.getItem('active_workspace_id') || 'project-1';

  useEffect(() => {
    if (workspaceId) {
      localStorage.setItem('active_workspace_id', workspaceId);
    }
  }, [workspaceId]);

  return activeSpaceId;
}
