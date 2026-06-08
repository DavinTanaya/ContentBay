import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Select,
  Dropdown,
  Modal,
  Empty,
  message,
} from 'antd';
import { PlusOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkspaceId } from '@/entities/workspace';
import { useGetContentModelsApi } from '@entities/content-model';
import { useGetContentsApi, deleteContentApi } from '@entities/content';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export const ContentListView: React.FC = () => {
  const navigate = useNavigate();
  const activeWorkspaceId = useActiveWorkspaceId();
  const [selectedModelId, setSelectedModelId] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isSelectModelOpen, setIsSelectModelOpen] = useState(false);

  // 1. Fetch Content Models to get schemas
  const { data: modelsData, loading: modelsLoading } = useGetContentModelsApi();
  const allModels = modelsData?.getContentModels || [];

  // Filter models for the current active workspace
  const workspaceModels = React.useMemo(() => {
    return allModels.filter(
      (m) => (m.workspaceId || 'project-1') === activeWorkspaceId,
    );
  }, [allModels, activeWorkspaceId]);

  // 2. Fetch Content Entries
  const activeModelFilter =
    selectedModelId === 'All' ? undefined : selectedModelId;
  const {
    data: contentsData,
    loading: contentsLoading,
    refetch,
  } = useGetContentsApi(activeWorkspaceId, activeModelFilter);
  const contents = contentsData?.getContents || [];

  // 3. Delete Mutation
  const handleDelete = async (id: string) => {
    try {
      await deleteContentApi(id, activeWorkspaceId, activeModelFilter);
      message.success('Content entry deleted successfully');
      refetch();
    } catch (err: unknown) {
      message.error(getErrorMessage(err, 'Failed to delete content'));
    }
  };

  const confirmDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete this entry?',
      content:
        'Are you sure you want to delete this content entry? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No',
      centered: true,
      onOk: () => handleDelete(id),
    });
  };

  const columns = [
    {
      title: 'Name / Title',
      key: 'name',
      render: (record: any) => {
        // Dynamically find a nice representative name/title from the JSON data
        const payload = record.data || {};
        const title =
          payload.title ||
          payload.name ||
          payload.label ||
          payload.heading ||
          Object.values(payload)[0] ||
          'Untitled';
        return (
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 line-clamp-1">
              {String(title)}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              ID: {record.id}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Content Type',
      key: 'type',
      render: (record: any) => {
        return (
          <span className="text-gray-500 font-medium">
            {record.contentModel?.name || 'Unknown Type'}
          </span>
        );
      },
    },
    {
      title: 'Updated At',
      key: 'updatedAt',
      render: (record: any) => {
        const dateStr = record.updatedAt
          ? new Date(
              parseInt(record.updatedAt) || record.updatedAt,
            ).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : '-';
        return <span className="text-gray-500">{dateStr}</span>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => {
        const status = record.status || 'draft';
        let color = '#9A6700';
        let bgColor = '#FFF8C5';
        if (status === 'published') {
          color = '#1A7F37';
          bgColor = '#E6FFED';
        }
        return (
          <Tag
            color={bgColor}
            className="border-none font-bold text-[10px] rounded-lg px-3 py-0.5 m-0 capitalize"
            style={{ color }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'actions',
      render: (record: any) => {
        const rowMenuItems = [
          {
            key: 'edit',
            label: 'Edit Entry',
            onClick: () =>
              navigate(
                `/workspace/${activeWorkspaceId}/content/create?modelId=${record.contentModelId}&entryId=${record.id}`,
              ),
          },
          {
            type: 'divider' as const,
          },
          {
            key: 'delete',
            label: (
              <span className="text-red-500 flex items-center gap-2">
                <DeleteOutlined /> Delete
              </span>
            ),
            onClick: () => confirmDelete(record.id),
          },
        ];
        return (
          <Dropdown menu={{ items: rowMenuItems }} trigger={['click']}>
            <Button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <MoreOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  // Client-side status filter
  const filteredContents = React.useMemo(() => {
    return contents.filter((item) => {
      if (statusFilter === 'All') return true;
      return (
        (item.status || 'draft').toLowerCase() === statusFilter.toLowerCase()
      );
    });
  }, [contents, statusFilter]);

  const handleAddEntryClick = () => {
    if (workspaceModels.length === 0) {
      message.warning(
        'Please create at least one Content Model first before adding content entries.',
      );
      return;
    }
    setIsSelectModelOpen(true);
  };

  const selectModelMenuItems = workspaceModels.map((model) => ({
    key: model.id,
    label: model.name,
    onClick: () => {
      setIsSelectModelOpen(false);
      navigate(
        `/workspace/${activeWorkspaceId}/content/create?modelId=${model.id}`,
      );
    },
  }));

  return (
    <div className="flex min-h-[calc(100vh-72px)] bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 p-8 space-y-10 shrink-0">
        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Views
          </h3>
          <div className="space-y-1">
            <button className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-900">
              All Content
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Status
          </h3>
          <div className="space-y-1">
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${status === statusFilter ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Content Type
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedModelId('All')}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedModelId === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              All Types
            </button>
            {workspaceModels.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors line-clamp-1 ${model.id === selectedModelId ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 bg-white">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-gray-900 mb-2 capitalize">
              {statusFilter === 'All' ? 'Content' : `${statusFilter} Entries`}
            </h1>
            <p className="text-gray-500 font-medium">
              Manage and publish your dynamic content entries
            </p>
          </div>

          <Dropdown
            menu={{ items: selectModelMenuItems }}
            open={isSelectModelOpen}
            onOpenChange={setIsSelectModelOpen}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="h-11 px-6 font-bold bg-[#2563EB] rounded-lg"
              onClick={handleAddEntryClick}
            >
              Create Content
            </Button>
          </Dropdown>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-8 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Content Type:
            </span>
            <Select
              value={selectedModelId}
              onChange={setSelectedModelId}
              className="w-40"
              variant="borderless"
            >
              <Select.Option value="All">All Types</Select.Option>
              {workspaceModels.map((model) => (
                <Select.Option key={model.id} value={model.id}>
                  {model.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Status:
            </span>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-32"
              variant="borderless"
            >
              {['All', 'Published', 'Draft'].map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-8">
          <Table
            columns={columns}
            dataSource={filteredContents}
            rowKey="id"
            loading={contentsLoading || modelsLoading}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: false,
              hideOnSinglePage: true,
            }}
            locale={{
              emptyText: (
                <Empty description="No content entries found. Let's create your first entry!" />
              ),
            }}
            className="content-list-table"
          />
        </div>
      </main>
    </div>
  );
};
