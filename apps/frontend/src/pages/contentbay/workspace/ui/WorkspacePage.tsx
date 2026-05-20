import { useNavigate } from 'react-router-dom';
import { getContentModelPath } from '@/shared/constants/routes';
import {
  Input,
  Button,
  Modal,
  Form,
  Avatar,
  Dropdown,
  type MenuProps,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useWorkspace } from '@/features/workspace-manage';

export default function WorkspacePage() {
  const navigate = useNavigate();
  const {
    filteredWorkspaces,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddWorkspace,
    handleDeleteWorkspace,
    getSpaceMembers,
    getRelativeTime,
  } = useWorkspace();

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Header and Controls Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="h3-semibold text-gray-10 m-0">Workspace</h1>
          <p className="body-sm-regular text-gray-8 m-0 max-w-[600px]">
            Manage your organization’s content architectures and delivery environments.
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
            onClick={() => setIsModalOpen(true)}
            className="shadow-sm"
          >
            Add new spaces
          </Button>
        </div>
      </div>

      {/* Grid of Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredWorkspaces.map((space) => {
          const spaceMembers = getSpaceMembers(space.id, space.members);
          // Dropdown menu options for the card
          const menuItems: MenuProps['items'] = [
            {
              key: 'delete',
              label: 'Delete Space',
              danger: true,
              icon: <DeleteOutlined />,
              onClick: () => handleDeleteWorkspace(space.id, space.name),
            },
          ];

          return (
            <div
              key={space.id}
              className="relative bg-white border border-gray-4 rounded-[32px] p-8 flex flex-col justify-between min-h-[250px] shadow-sm hover:shadow-md hover:border-blue-3 transition-all duration-300 group"
            >
              {/* Top part */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  {/* Folder Icon Wrapper */}
                  <div className="w-[50px] h-[50px] rounded bg-blue-1 flex items-center justify-center">
                    <FolderOpenOutlined className="text-blue-7 text-2xl" />
                  </div>

                  {/* Actions Dropdown */}
                  <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined className="text-xl text-gray-7 hover:text-gray-10" />}
                    />
                  </Dropdown>
                </div>

                {/* Workspace Title & Details */}
                <h3 className="font-poppins text-lg font-semibold text-gray-13 mb-3 leading-snug">
                  {space.name}
                </h3>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-7 mb-4">
                  <span>
                    <strong className="font-semibold text-gray-10">{space.types}</strong> TYPES
                  </span>
                  <span className="w-1 h-1 bg-gray-4 rounded-full" />
                  <span>
                    <strong className="font-semibold text-gray-10">{space.env}</strong> ENV
                  </span>
                  <span className="w-1 h-1 bg-gray-4 rounded-full" />
                  <span>
                    <strong className="font-semibold text-gray-10">{space.records}</strong> RECORDS
                  </span>
                </div>

                {/* Updated ago */}
                <div className="flex items-center gap-1.5 text-xs text-gray-7 mb-6">
                  <ClockCircleOutlined className="text-[11px]" />
                  <span>{getRelativeTime(space.updated, space.createdAt)}</span>
                </div>
              </div>

              {/* Bottom part */}
              <div>
                {/* Horizontal Line Divider */}
                <div className="border-t border-gray-4 my-4" />

                <div className="flex items-center justify-between">
                  {/* Members Avatars */}
                  <Avatar.Group
                    maxCount={3}
                    maxStyle={{
                      color: '#003a8c',
                      backgroundColor: '#e6f7ff',
                      fontSize: '11px',
                    }}
                    size="small"
                  >
                    {spaceMembers.map((initial, i) => (
                      <Avatar
                        key={i}
                        className="bg-blue-6 text-white text-xs border-white"
                        style={{
                          backgroundColor:
                            i === 0
                              ? '#1890ff'
                              : i === 1
                                ? '#52c41a'
                                : i === 2
                                  ? '#faad14'
                                  : '#f5222d',
                        }}
                      >
                        {initial}
                      </Avatar>
                    ))}
                  </Avatar.Group>

                  {/* Clickable Enter Project link */}
                  <div
                    onClick={() => {
                      navigate(getContentModelPath(space.id));
                    }}
                    className="font-poppins text-xs font-medium text-blue-9 hover:text-blue-7 flex items-center gap-1 cursor-pointer transition-colors group-hover:translate-x-0.5 duration-200"
                  >
                    <span>Enter project</span>
                    <ArrowRightOutlined className="text-[10px]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredWorkspaces.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white border border-gray-4 border-dashed rounded-[32px]">
            <FolderOpenOutlined className="text-4xl text-gray-6 mb-4" />
            <h4 className="font-poppins text-lg font-medium text-gray-10 mb-2">
              No workspaces found
            </h4>
            <p className="text-sm text-gray-7 mb-6">
              Get started by creating a new workspace space.
            </p>
            <Button
              type="primary"
              variant="solid"
              color="geekblue"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Add new spaces
            </Button>
          </div>
        )}
      </div>

      {/* Add Workspace Modal */}
      <Modal
        title={
          <span className="font-poppins font-semibold text-lg text-gray-13">
            Create a New Workspace Space
          </span>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        centered
        width={480}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddWorkspace}
          className="mt-6"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-gray-9 text-sm">Space Name</span>}
            rules={[{ required: true, message: 'Please enter space name!' }]}
          >
            <Input placeholder="e.g. Production CMS, Staging Space" size="large" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              size="large"
              onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" variant="solid" color="geekblue" htmlType="submit" size="large">
              Create Space
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
