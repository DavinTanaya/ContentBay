import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider, message, Skeleton } from 'antd';
import {
  ArrowLeftOutlined,
  SettingOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { WorkspaceCredentialsWidget } from '@/widgets/workspace-credentials';
import { WorkspaceDeleteButton } from '@/features/workspace-delete';
import { WorkspaceUpdateForm } from '@/features/workspace-update';
import { useActiveWorkspaceId, useGetWorkspaceApi } from '@/entities/workspace';
import type { Workspace } from '@/entities/workspace';

export default function WorkspaceDetailPage() {
  const navigate = useNavigate();
  const activeId = useActiveWorkspaceId();
  const { data, loading: fetchLoading } = useGetWorkspaceApi(activeId);

  const activeSpace: Workspace | null = data?.getWorkspace || null;

  const handleCopyId = () => {
    if (activeSpace?.id) {
      navigator.clipboard.writeText(activeSpace.id);
      return true;
    }
    return false;
  };

  if (fetchLoading) {
    return (
      <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
        <div className="flex items-center gap-4 mb-10">
          <Button
            type="text"
            shape="circle"
            className="text-gray-8 hover:text-black hover:bg-gray-2 mr-4 -ml-2"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
          />
          <div className="flex flex-col">
            <h1 className="h3-semibold text-gray-10 m-0">Workspace settings</h1>
            <p className="body-sm-regular text-gray-7 m-0">
              Configure details, naming, and environments for this workspace.
            </p>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white border border-gray-3 rounded-[32px] p-10 mb-10 shadow-sm">
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
          <div className="bg-white border border-gray-3 rounded-[32px] p-10 shadow-sm">
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!activeSpace) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h2 className="text-gray-9 mb-4">Workspace not found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const onCopy = () => {
    if (handleCopyId()) {
      message.success('Workspace ID copied to clipboard!');
    }
  };

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Back button and Page Title */}
      <div className="flex items-center gap-4 mb-10">
        <Button
          type="text"
          shape="circle"
          className="text-gray-8 hover:text-black hover:bg-gray-2 mr-2 -ml-2"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        />
        <div className="flex flex-col">
          <h1 className="h3-semibold text-gray-10 m-0">Workspace settings</h1>
          <p className="body-sm-regular text-gray-7 m-0">
            Configure details, naming, and environments for this workspace.
          </p>
        </div>
      </div>

      {/* Centered Cards Container */}
      <div className="max-w-[900px] mx-auto">
        {/* Main Settings Card */}
        <div className="bg-white border border-gray-4 rounded-[32px] p-10 mb-10 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <SettingOutlined className="text-blue-6 text-xl" />
            <h3 className="font-poppins text-lg font-semibold text-gray-13 m-0">
              General
            </h3>
          </div>

          {/* Workspace ID Input Field */}
          <div className="mb-8 w-full">
            <label className="block text-sm font-semibold text-gray-9 mb-2">
              Workspace ID
            </label>
            <Input
              value={activeSpace.id}
              readOnly
              size="large"
              className="font-mono bg-gray-2 border-gray-4 text-gray-8 rounded-xl h-12"
              suffix={
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    <CopyOutlined className="text-gray-7 hover:text-blue-6" />
                  }
                  onClick={onCopy}
                  className="hover:bg-gray-3 border-none flex items-center justify-center"
                />
              }
            />
            <span className="text-[11px] text-gray-7 block mt-1">
              Unique database identifier for API environments and endpoints.
            </span>
          </div>

          <Divider className="border-gray-4 my-8" />

          <WorkspaceUpdateForm
            workspaceId={activeSpace.id}
            initialName={activeSpace.name}
            initialDescription={activeSpace.description}
          />
        </div>

        {/* API Credentials Card */}
        <WorkspaceCredentialsWidget workspaceId={activeSpace.id} />

        {/* Delete Workspace Danger Zone Card */}
        <div className="bg-white border border-gray-4 rounded-[32px] p-10 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-poppins text-lg font-semibold text-gray-13 m-0">
              Delete
            </h3>
          </div>

          <p className="body-sm-regular text-gray-7 mb-6 w-full">
            Once you delete this workspace, all schemas, layouts, content
            assets, and historical deployment records will be permanently
            removed.
          </p>

          <WorkspaceDeleteButton
            workspaceId={activeSpace.id}
            workspaceName={activeSpace.name}
          />
        </div>
      </div>
    </div>
  );
}
