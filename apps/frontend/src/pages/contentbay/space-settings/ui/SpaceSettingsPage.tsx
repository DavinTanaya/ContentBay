import { useNavigate } from 'react-router-dom';
import { Input, Button, Divider } from 'antd';
import {
  ArrowLeftOutlined,
  SettingOutlined,
  CopyOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useSpaceSettings } from '@/features/space-manage';

export default function SpaceSettingsPage() {
  const navigate = useNavigate();
  const {
    activeSpace,
    newName,
    setNewName,
    handleCopyId,
    handleRename,
    handleDelete,
  } = useSpaceSettings();

  if (!activeSpace) {
    return (
      <div className="p-12 text-center text-gray-8">
        Loading active space configurations...
      </div>
    );
  }

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Back button and Page Title */}
      <div className="flex items-center gap-4 mb-10">
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined className="text-gray-7 hover:text-gray-13" />}
          onClick={() => navigate('/content-model')}
          className="hover:bg-white shadow-sm"
        />
        <div className="flex flex-col">
          <h1 className="h3-semibold text-gray-10 m-0">Space settings</h1>
          <p className="body-sm-regular text-gray-7 m-0">Configure details, naming, and environments for this project space.</p>
        </div>
      </div>

      {/* Centered Cards Container */}
      <div className="max-w-[900px] mx-auto">
        {/* Main Settings Card */}
        <div className="bg-white border border-gray-4 rounded-[32px] p-10 mb-10 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <SettingOutlined className="text-blue-6 text-xl" />
            <h3 className="font-poppins text-lg font-semibold text-gray-13 m-0">General</h3>
          </div>

          {/* Space ID Input Field */}
          <div className="mb-8 w-full">
            <label className="block text-sm font-semibold text-gray-9 mb-2">Space ID</label>
            <Input
              value={activeSpace.id}
              readOnly
              size="large"
              className="font-mono bg-gray-2 border-gray-4 text-gray-8 rounded-xl h-12"
              suffix={
                <Button
                  type="text"
                  shape="circle"
                  icon={<CopyOutlined className="text-gray-7 hover:text-blue-6" />}
                  onClick={handleCopyId}
                  className="hover:bg-gray-3 border-none flex items-center justify-center"
                />
              }
            />
            <span className="text-[11px] text-gray-7 block mt-1">Unique database identifier for API environments and endpoints.</span>
          </div>

          <Divider className="border-gray-4 my-8" />

          {/* Space Name Rename Form */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-9 mb-2">Space name</label>
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
                onClick={handleRename}
                className="h-12 px-6 rounded-xl shadow-sm shrink-0"
              >
                Rename space
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Space Danger Zone Card */}
        <div className="bg-white border border-gray-4 rounded-[32px] p-10 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-poppins text-lg font-semibold text-gray-13 m-0">Delete</h3>
          </div>
          
          <p className="body-sm-regular text-gray-7 mb-6 w-full">
            Once you delete this workspace space, all schemas, layouts, content assets, and historical deployment records will be permanently removed.
          </p>

          <Button
            type="primary"
            danger
            size="large"
            onClick={handleDelete}
            className="rounded-xl h-12 px-6 shadow-sm"
          >
            Delete space
          </Button>
        </div>
      </div>
    </div>
  );
}
