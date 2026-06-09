import React from 'react';
import { useActiveWorkspaceId } from '@/entities/workspace';
import { useContentList } from '@/widgets/content-list/model/useContentList';
import { ContentListHeader } from '@/widgets/content-list/content-list-header/ui/ContentListHeader';
import { ContentListFilters } from '@/widgets/content-list/content-list-filters/ui/ContentListFilters';
import { ContentListTable } from '@/widgets/content-list/content-list-table/ui/ContentListTable';
import { EntryListSkeleton } from '@/widgets/content-list/content-list-table/ui/EntryListSkeleton';
import { EmptyState } from '@/shared/errors/components/EmptyState';
import { NetworkError } from '@/shared/errors/components/NetworkError';
import { useNavigate } from 'react-router-dom';
import { getContentModelPath } from '@/shared/constants/routes';

export const ContentListPage: React.FC = () => {
  const activeWorkspaceId = useActiveWorkspaceId();
  const navigate = useNavigate();

  const {
    workspaceModels,
    contents,
    selectedModelId,
    setSelectedModelId,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    refetch,
  } = useContentList(activeWorkspaceId);

  // Error State Handling
  if (error) {
    return (
      <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] p-8">
        <NetworkError onRetry={() => refetch()} />
      </div>
    );
  }

  const hasNoModels = !loading && workspaceModels.length === 0;
  const hasNoContents =
    !loading &&
    contents.length === 0 &&
    selectedModelId === 'All' &&
    statusFilter === 'All';

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] p-8 font-poppins">
      <div className="max-w-[1200px] mx-auto">
        <ContentListHeader
          workspaceId={activeWorkspaceId}
          workspaceModels={workspaceModels}
        />

        <ContentListFilters
          selectedModelId={selectedModelId}
          setSelectedModelId={setSelectedModelId}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          workspaceModels={workspaceModels}
        />

        <div className="mt-8">
          {loading ? (
            <EntryListSkeleton />
          ) : hasNoModels ? (
            <EmptyState
              title="No Content Models Yet"
              description="You need to create a content model structure before you can add entries."
              actionText="Create Content Model"
              onAction={() => navigate(getContentModelPath(activeWorkspaceId))}
            />
          ) : hasNoContents ? (
            <EmptyState
              title="No Entries Found"
              description="Create your first content entry to start managing your data."
              actionText="Create Entry"
              onAction={() => {
                if (workspaceModels.length > 0) {
                  navigate(
                    `/workspace/${activeWorkspaceId}/content/create?modelId=${workspaceModels[0].id}`,
                  );
                }
              }}
            />
          ) : (
            <ContentListTable
              contents={contents}
              workspaceId={activeWorkspaceId}
              loading={loading}
              onRefresh={refetch}
            />
          )}
        </div>
      </div>
    </div>
  );
};
