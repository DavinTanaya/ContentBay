import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider, message, Skeleton, Form } from 'antd';
import {
  ArrowLeftOutlined,
  SettingOutlined,
  CopyOutlined,
  DeleteOutlined,
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
        <div className="flex items-center gap-4 mb-8">
          <Button
            type="text"
            shape="circle"
            className="text-gray-8 hover:text-black hover:bg-gray-2 -ml-2"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-9 m-0">
              Workspace settings
            </h1>
            <p className="text-sm text-gray-500 m-0">
              Configure details, naming, and environments for this workspace.
            </p>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto flex flex-col gap-6">
          <div className="bg-white border border-gray-3 rounded-2xl p-8 shadow-sm">
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
          <div className="bg-white border border-gray-3 rounded-2xl p-8 shadow-sm">
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
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="text"
          shape="circle"
          className="text-gray-8 hover:text-black hover:bg-gray-2 -ml-2"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-9 m-0">
            Workspace settings
          </h1>
          <p className="text-sm text-gray-500 m-0">
            Configure details, naming, and environments for this workspace.
          </p>
        </div>
      </div>

      {/* Centered Cards Container */}
      <div className="max-w-[900px] mx-auto flex flex-col gap-6">
        {/* Main Settings Card */}
        <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.12)] hover:-translate-y-[2px] transition-all duration-500 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm">
              <SettingOutlined className="text-[22px]" />
            </div>
            <h3 className="text-xl font-bold text-gray-10 m-0">Detail</h3>
          </div>

          <Form layout="vertical" requiredMark={false} className="w-full">
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-8">
                  Workspace ID
                </span>
              }
              extra={
                <span className="text-xs text-gray-500">
                  Unique database identifier for API environments and endpoints.
                </span>
              }
              className="mb-0"
            >
              <Input
                value={activeSpace.id}
                readOnly
                size="large"
                className="font-mono bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 transition-all text-gray-8"
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
            </Form.Item>
          </Form>

          <Divider className="border-gray-5 my-4" />

          <WorkspaceUpdateForm
            workspaceId={activeSpace.id}
            initialName={activeSpace.name}
            initialDescription={activeSpace.description}
          />
        </div>

        <WorkspaceCredentialsWidget workspaceId={activeSpace.id} />

        <div className="relative rounded-[32px] bg-white ring-1 ring-red-200/50 shadow-none hover:ring-red-400 hover:shadow-[0_12px_32px_rgba(255,100,100,0.12)] hover:-translate-y-[2px] transition-all duration-500 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-2xl bg-red-50/80 ring-1 ring-red-100 flex items-center justify-center text-red-500 shadow-sm shrink-0">
                <DeleteOutlined className="text-[22px]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-10 m-0">Delete Workspace</h3>
                <p className="text-sm text-gray-500 mt-1 m-0 max-w-lg">
                  Once you delete this workspace, all schemas, layouts, content assets, and historical deployment records will be permanently removed.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4 md:mt-0">
              <WorkspaceDeleteButton
                workspaceId={activeSpace.id}
                workspaceName={activeSpace.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
