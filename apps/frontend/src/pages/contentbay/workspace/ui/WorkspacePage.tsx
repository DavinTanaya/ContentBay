import { Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useWorkspace } from '@/entities/workspace';
import { WorkspaceCreateModal, useCreateWorkspace } from '@/features/workspace-create';
import { WorkspaceList } from '@/widgets/workspace-list';

export default function WorkspacePage() {
  const {
    filteredWorkspaces,
    searchQuery,
    setSearchQuery,
    currentUser,
    refetch,
  } = useWorkspace();

  const { isModalOpen, openModal, closeModal, submitCreate, loading } = useCreateWorkspace(() => {
    refetch();
  });

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="h3-semibold text-gray-10 m-0">Workspace</h1>
          <p className="body-sm-regular text-gray-8 m-0 max-w-[600px]">
            Manage your organization’s content architectures and delivery
            environments.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto self-end md:self-center">
          <Input
            placeholder="Input search text"
            size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-[280px]"
            prefix={<SearchOutlined className="text-gray-6" />}
            allowClear
          />
          <Button
            type="primary"
            variant="solid"
            color="geekblue"
            size="large"
            icon={<PlusOutlined />}
            onClick={openModal}
            className="shadow-sm"
          >
            Add new spaces
          </Button>
        </div>
      </div>

      <WorkspaceList
        workspaces={filteredWorkspaces}
        onAddClick={openModal}
        currentUser={currentUser}
      />

      <WorkspaceCreateModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onSubmit={submitCreate}
        loading={loading}
      />
    </div>
  );
}
