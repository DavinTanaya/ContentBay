import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider, message, Modal, Skeleton } from 'antd';
import {
  ArrowLeftOutlined,
  SettingOutlined,
  CopyOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useWorkspaceDetail } from '@/features/workspace-detail';
import { WorkspaceCredentialsWidget } from '@/widgets/workspace-credentials';

export default function WorkspaceDetailPage() {
  const navigate = useNavigate();
  const {
    activeSpace,
    newName,
    setNewName,
    handleCopyId,
    handleRename,
    handleDeleteConfirm,
  } = useWorkspaceDetail();

  if (!activeSpace) {
    return (
      <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
        {/* Back button and Page Title */}
        <div className="flex items-center gap-4 mb-10">
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={
              <ArrowLeftOutlined className="text-gray-7 hover:text-gray-13" />
            }
            onClick={() => navigate('/content-model')}
            className="hover:bg-white shadow-sm"
          />
          <div className="flex flex-col">
            <h1 className="h3-semibold text-gray-10 m-0">Space settings</h1>
            <p className="body-sm-regular text-gray-7 m-0">
              Configure details, naming, and environments for this project space.
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

  const onRename = async () => {
    try {
      await handleRename();
      message.success(`Workspace renamed successfully!`);
    } catch (err: any) {
      message.error(err.message || 'Failed to rename workspace.');
    }
  };

  const onDelete = () => {
    Modal.confirm({
      icon: null,
      title: null,
      content: (
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 mb-6 shadow-sm shadow-blue-500/10">
            <ExclamationCircleOutlined
              style={{ fontSize: '32px', color: '#1890ff' }}
            />
          </div>
          <h3 className="font-poppins text-lg font-bold text-gray-13 mb-3 leading-snug">
            Are you absolutely sure?
          </h3>
          <p className="font-poppins text-sm text-gray-8 leading-relaxed mb-0">
            This action is{' '}
            <span
              className="font-semibold text-red-5"
              style={{ color: '#ff4d4f' }}
            >
              irreversible
            </span>{' '}
            and will permanently delete the workspace{' '}
            <span
              className="font-semibold text-gray-10"
              style={{ color: '#262626' }}
            >
              "{activeSpace.name}"
            </span>{' '}
            along with all nested content schemas.
          </p>
        </div>
      ),
      okText: 'Yes, Delete Space',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      width: 440,
      okButtonProps: {
        size: 'large',
        className: 'rounded-xl h-11 px-6 font-medium font-poppins shadow-sm',
        style: {
          backgroundColor: '#ff4d4f',
          borderColor: '#ff4d4f',
          color: '#ffffff',
        },
      },
      cancelButtonProps: {
        size: 'large',
        className:
          'rounded-xl h-11 px-6 font-medium font-poppins border-gray-4 text-gray-8 hover:text-gray-13 hover:border-gray-6',
        style: { borderRadius: '12px' },
      },
      onOk: async () => {
        try {
          await handleDeleteConfirm();
          message.success(`Workspace has been deleted.`);
        } catch (err: any) {
          message.error(err.message || 'Failed to delete workspace.');
        }
      },
    });
  };

  const onCopy = () => {
    if (handleCopyId()) {
      message.success('Space ID copied to clipboard!');
    }
  };

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Back button and Page Title */}
      <div className="flex items-center gap-4 mb-10">
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={
            <ArrowLeftOutlined className="text-gray-7 hover:text-gray-13" />
          }
          onClick={() => navigate('/content-model')}
          className="hover:bg-white shadow-sm"
        />
        <div className="flex flex-col">
          <h1 className="h3-semibold text-gray-10 m-0">Space settings</h1>
          <p className="body-sm-regular text-gray-7 m-0">
            Configure details, naming, and environments for this project space.
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

          {/* Space ID Input Field */}
          <div className="mb-8 w-full">
            <label className="block text-sm font-semibold text-gray-9 mb-2">
              Space ID
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

          {/* Space Name Rename Form */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-9 mb-2">
              Space name
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter space name"
                size="large"
                prefix={<EditOutlined className="text-gray-7" />}
                className="border-gray-4 rounded-xl h-12 flex-1"
              />
              <Button
                type="primary"
                variant="solid"
                color="geekblue"
                size="large"
                onClick={onRename}
                className="h-12 px-6 rounded-xl shadow-sm shrink-0"
              >
                Rename space
              </Button>
            </div>
          </div>
        </div>

        {/* API Credentials Card */}
        <WorkspaceCredentialsWidget workspaceId={activeSpace.id} />

        {/* Delete Space Danger Zone Card */}
        <div className="bg-white border border-gray-4 rounded-[32px] p-10 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-poppins text-lg font-semibold text-gray-13 m-0">
              Delete
            </h3>
          </div>

          <p className="body-sm-regular text-gray-7 mb-6 w-full">
            Once you delete this workspace space, all schemas, layouts, content
            assets, and historical deployment records will be permanently
            removed.
          </p>

          <Button
            type="primary"
            danger
            size="large"
            onClick={onDelete}
            className="rounded-xl h-12 px-6 shadow-sm"
          >
            Delete space
          </Button>
        </div>
      </div>
    </div>
  );
}
