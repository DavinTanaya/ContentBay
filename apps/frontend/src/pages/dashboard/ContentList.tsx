import React, { useState } from 'react';
import { Table, Tag, Button, Select, Avatar, Input, Pagination } from 'antd';
import { PlusOutlined, MoreOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ContentList: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const sidebarViews = ['All Content', 'Recent'];
  const sidebarStatus = ['All', 'Published', 'Changed', 'Draft', 'Archived'];
  const sidebarTypes = ['All Types', 'Article', 'Product', 'Event', 'Author'];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-bold text-gray-900">{text}</span>,
    },
    {
      title: 'Content Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <span className="text-gray-500 font-medium">{text}</span>,
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
      render: (text: string) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'Last updated by',
      dataIndex: 'author',
      key: 'author',
      render: (author: string) => (
        <div className="flex items-center gap-2">
          <Avatar size="small" icon={<UserOutlined />} className="bg-blue-50 text-[#2563EB]" />
          <span className="text-xs font-bold text-gray-900">{author}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let bgColor = '';
        switch (status) {
          case 'Published': color = '#1A7F37'; bgColor = '#E6FFED'; break;
          case 'Changed': color = '#0969DA'; bgColor = '#DDF4FF'; break;
          case 'Draft': color = '#9A6700'; bgColor = '#FFF8C5'; break;
          case 'Archived': color = '#8250DF'; bgColor = '#F5F0FF'; break;
        }
        return (
          <Tag color={bgColor} className="border-none font-bold text-[10px] rounded px-2 m-0" style={{ color }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: '',
      key: 'actions',
      render: () => <button className="text-gray-400 hover:text-gray-600"><MoreOutlined /></button>,
    },
  ];

  const data = Array(11).fill(null).map((_, i) => ({
    key: i,
    name: 'Product1',
    type: 'Product',
    updated: '21 Feb 2026',
    author: 'User 1',
    status: i === 1 ? 'Changed' : i === 2 ? 'Archived' : i === 3 ? 'Draft' : 'Published',
  })).filter(item => statusFilter === 'All' || item.status === statusFilter);

  return (
    <div className="flex min-h-[calc(100vh-72px)] bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 p-8 space-y-10 shrink-0">
        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Views</h3>
          <div className="space-y-1">
            {sidebarViews.map(view => (
              <button key={view} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'All Content' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}>
                {view}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Status</h3>
          <div className="space-y-1">
            {sidebarStatus.map(status => (
              <button 
                key={status} 
                onClick={() => setStatusFilter(status)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${status === statusFilter ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Content Type</h3>
          <div className="space-y-1">
            {sidebarTypes.map(type => (
              <button 
                key={type} 
                onClick={() => setTypeFilter(type)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${type === typeFilter ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 bg-white">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-gray-900 mb-2">{statusFilter === 'All' ? 'Content' : statusFilter}</h1>
            <p className="text-gray-500 font-medium">Manage and publish your content</p>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            className="h-11 px-6 font-bold bg-[#2563EB] rounded-lg"
            onClick={() => navigate('/content/create')}
          >
            Add Entry
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-8 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Content Type:</span>
            <Select 
              defaultValue="All" 
              className="w-28" 
              bordered={false} 
              suffixIcon={<div className="border-l border-gray-200 pl-2 ml-2"><ClockCircleOutlined className="text-[10px] text-gray-400" /></div>}
            >
              <Select.Option value="All">All</Select.Option>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Status:</span>
            <Select 
              value={statusFilter} 
              onChange={setStatusFilter}
              className="w-32" 
              bordered={false}
            >
              {sidebarStatus.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Created by:</span>
            <Select defaultValue="All" className="w-28" bordered={false}>
              <Select.Option value="All">All</Select.Option>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-8">
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
            className="content-list-table"
          />
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">Showing 1 to 11 of 247 entries</p>
          <Pagination defaultCurrent={1} total={300} showSizeChanger={false} />
        </div>
      </main>
    </div>
  );
};

export default ContentList;
