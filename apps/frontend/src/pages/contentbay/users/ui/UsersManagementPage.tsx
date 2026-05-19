import { useNavigate } from 'react-router-dom';
import { Input, Button, Modal, Form, Select, Checkbox, Pagination } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CodeOutlined from '@ant-design/icons/CodeOutlined';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import { useUsersManagement } from '@/features/user-manage';

export default function UsersManagementPage() {
  const navigate = useNavigate();
  const {
    users,
    paginatedUsers,
    sortedUsers,
    filteredUsersCount,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    isInviteModalOpen,
    setIsInviteModalOpen,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    selectedUserIds,
    handleSelectAll,
    handleSelectUser,
    handleInviteUser,
    form,
    startIndex,
    endIndex,
  } = useUsersManagement();

  return (
    <div className="p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] bg-gray-1">
      {/* Back button and Top Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/content-model')}
            className="text-gray-7 hover:text-gray-10"
          />
          <h1 className="h3-semibold text-gray-10 m-0">Users</h1>
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
            icon={<UserAddOutlined />}
            onClick={() => setIsInviteModalOpen(true)}
            className="shadow-sm font-semibold"
          >
            Invite users
          </Button>
        </div>
      </div>

      {/* Sorting & Filter Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="w-44"
            size="large"
            options={[
              { value: 'Newest', label: 'Sort by: Newest' },
              { value: 'Oldest', label: 'Sort by: Oldest' },
              { value: 'Name', label: 'Sort by: Name' },
            ]}
          />
          <span className="text-xs text-gray-7 font-poppins">
            {filteredUsersCount} user{filteredUsersCount !== 1 && 's'} found
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-8">Status:</span>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="w-36"
              size="large"
              options={[
                { value: 'Any', label: 'Any' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-8">Project role:</span>
            <Select
              value={selectedRole}
              onChange={setSelectedRole}
              className="w-44"
              size="large"
              options={[
                {
                  value: 'Any',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <AppstoreOutlined className="text-gray-6" />
                      <span>Any Role</span>
                    </div>
                  ),
                },
                {
                  value: 'Owner',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <CrownOutlined className="text-amber-500" />
                      <span>Owner</span>
                    </div>
                  ),
                },
                {
                  value: 'Admin',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <SafetyOutlined className="text-blue-6" />
                      <span>Admin</span>
                    </div>
                  ),
                },
                {
                  value: 'Editor',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <EditOutlined className="text-purple-6" />
                      <span>Editor</span>
                    </div>
                  ),
                },
                {
                  value: 'Developer',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <CodeOutlined className="text-green-6" />
                      <span>Developer</span>
                    </div>
                  ),
                },
              ]}
              optionLabelProp="label"
            />
          </div>
        </div>
      </div>

      {/* Custom Mockup Table Card */}
      <div className="bg-white border border-gray-4 rounded-[25px] overflow-hidden p-8 flex flex-col shadow-sm mb-6">
        {/* Table Header Row */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-4 items-center mb-6">
          <div className="col-span-1 flex items-center justify-start pl-2">
            <Checkbox
              checked={selectedUserIds.length === users.length && users.length > 0}
              indeterminate={selectedUserIds.length > 0 && selectedUserIds.length < users.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
          <div className="col-span-4 text-xs font-semibold text-gray-8 tracking-wider">USER</div>
          <div className="col-span-3 text-xs font-semibold text-gray-8 tracking-wider">ORGANIZATION ROLE</div>
          <div className="col-span-2 text-xs font-semibold text-gray-8 tracking-wider">LAST ACTIVE</div>
          <div className="col-span-2 text-xs font-semibold text-gray-8 tracking-wider">2FA STATUS</div>
        </div>

        {/* Table Body Rows */}
        <div className="flex flex-col gap-6">
          {paginatedUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 flex items-center justify-start pl-2">
                <Checkbox
                  checked={selectedUserIds.includes(user.id)}
                  onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                />
              </div>

              {/* User Avatar + Details */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-[30px] h-[30px] rounded-xl bg-blue-1 flex items-center justify-center shrink-0">
                  <UserOutlined className="text-blue-7 text-[13px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins font-medium text-sm text-gray-13 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-8 font-poppins">{user.email}</span>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-3 font-poppins text-sm text-gray-13">{user.role}</div>

              {/* Last active */}
              <div className="col-span-2 font-poppins text-sm text-gray-13">{user.lastActive}</div>

              {/* 2FA Status */}
              <div className="col-span-2 font-poppins text-sm text-gray-13">{user.twoFactorStatus}</div>
            </div>
          ))}

          {paginatedUsers.length === 0 && (
            <div className="text-center py-12 text-gray-7">No matching users found.</div>
          )}
        </div>
      </div>

      {/* Footer / Pagination Row */}
      <div className="flex items-center justify-between text-xs text-gray-8 font-poppins">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>View</span>
            <Select
              value={pageSize}
              onChange={setPageSize}
              size="small"
              className="w-16"
              options={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
            />
          </div>
          <span>
            Showing {sortedUsers.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, sortedUsers.length)} of {sortedUsers.length} items
          </span>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedUsers.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          size="small"
        />
      </div>

      {/* Invite Modal */}
      <Modal
        title={
          <span className="font-poppins font-semibold text-lg text-gray-13">
            Invite a New User
          </span>
        }
        open={isInviteModalOpen}
        onCancel={() => {
          setIsInviteModalOpen(false);
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
          onFinish={handleInviteUser}
          className="mt-6"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 shrink-0">
                  <UserOutlined />
                </div>
                <span className="font-semibold text-gray-9 text-sm">Full Name</span>
              </span>
            }
            rules={[{ required: true, message: 'Please enter user name!' }]}
          >
            <Input placeholder="e.g. John Doe" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className="flex items-center gap-3 mb-1 text-gray-8 label-sm-semibold">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-6 shrink-0">
                  <MailOutlined />
                </div>
                <span className="font-semibold text-gray-9 text-sm">Email Address</span>
              </span>
            }
            rules={[
              { required: true, message: 'Please enter email address!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input placeholder="e.g. johndoe@company.com" size="large" />
          </Form.Item>

          <Form.Item
            name="role"
            label={<span className="font-semibold text-gray-9 text-sm">Project Role</span>}
            rules={[{ required: true, message: 'Please select a role!' }]}
            initialValue="Developer"
          >
            <Select
              size="large"
              options={[
                {
                  value: 'Owner',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <CrownOutlined className="text-amber-500" />
                      <span>Owner</span>
                    </div>
                  ),
                },
                {
                  value: 'Admin',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <SafetyOutlined className="text-blue-6" />
                      <span>Admin</span>
                    </div>
                  ),
                },
                {
                  value: 'Editor',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <EditOutlined className="text-purple-6" />
                      <span>Editor</span>
                    </div>
                  ),
                },
                {
                  value: 'Developer',
                  label: (
                    <div className="flex items-center gap-2 text-gray-9 font-poppins">
                      <CodeOutlined className="text-green-6" />
                      <span>Developer</span>
                    </div>
                  ),
                },
              ]}
              optionLabelProp="label"
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              size="large"
              onClick={() => {
                setIsInviteModalOpen(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" variant="solid" color="geekblue" htmlType="submit" size="large">
              Invite User
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
