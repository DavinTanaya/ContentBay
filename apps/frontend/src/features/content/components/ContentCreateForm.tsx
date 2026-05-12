import React, { useState } from 'react';
import { Tabs, Input, Button, Radio, Avatar, Tag, Upload } from 'antd';
import {
  ArrowLeftOutlined,
  CloudUploadOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const ContentCreateForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor');
  const [tags, setTags] = useState(['Technology', 'Tutorial']);

  const availableTags = [
    'Technology',
    'Product',
    'Tutorial',
    'Featured',
    'New',
  ];

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] p-12">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={() => navigate('/content')}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftOutlined className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
              Create Entry
            </h1>
            <p className="text-gray-500 font-medium">
              Product / <span className="text-gray-400">Nama Product</span>
            </p>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="content-tabs mb-0"
          items={[
            { label: 'Editor', key: 'editor' },
            { label: 'References', key: 'references' },
            { label: 'Tags', key: 'tags' },
          ]}
        />
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="flex-[2] space-y-8">
          {activeTab === 'editor' && (
            <div className="bg-white rounded-[32px] border border-gray-200 p-12 space-y-8">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  <span className="text-red-500 mr-1">*</span> Internal name
                  (required)
                </label>
                <Input
                  placeholder="Entry identifier for internal use"
                  className="h-12 rounded-lg bg-white border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  <span className="text-red-500 mr-1">*</span> Page title
                  (required)
                </label>
                <Input
                  placeholder="The title that appears on the page"
                  className="h-12 rounded-lg bg-white border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Page Description
                </label>
                <Input.TextArea
                  placeholder="Enter a brief description"
                  rows={4}
                  className="rounded-lg bg-white border-gray-200 p-4"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  URL Slug
                </label>
                <Input
                  placeholder="URL"
                  className="h-12 rounded-lg bg-white border-gray-200"
                />
                <p className="text-[11px] text-gray-400 mt-2 font-medium">
                  Used in the URL path for this entry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    nofollow (required)
                  </label>
                  <Radio.Group defaultValue={true} className="flex gap-4">
                    <Radio value={true}>
                      <span className="text-sm font-medium">true</span>
                    </Radio>
                    <Radio value={false}>
                      <span className="text-sm font-medium">false</span>
                    </Radio>
                  </Radio.Group>
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">
                    When set to "true", disallows search engines from crawling
                    the links on this page.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    noindex (required)
                  </label>
                  <Radio.Group defaultValue={true} className="flex gap-4">
                    <Radio value={true}>
                      <span className="text-sm font-medium">true</span>
                    </Radio>
                    <Radio value={false}>
                      <span className="text-sm font-medium">false</span>
                    </Radio>
                  </Radio.Group>
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">
                    When set to "true", disallows search engines from indexing
                    this page.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Share images
                </label>
                <Upload.Dragger className="rounded-2xl border-dashed border-gray-200 bg-gray-50 p-12">
                  <div className="flex flex-col items-center gap-4">
                    <CloudUploadOutlined className="text-3xl text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700">
                        Drop image here or click to browse
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                        Recommended: 1200x630px, JPG or PNG
                      </p>
                    </div>
                  </div>
                </Upload.Dragger>
              </div>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="bg-white rounded-[32px] border border-gray-200 p-24 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 font-medium mb-6">
                No references configured
              </p>
              <Button className="h-11 px-8 font-bold border-gray-200 rounded-lg">
                Add Reference
              </Button>
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="bg-white rounded-[32px] border border-gray-200 p-12 space-y-10">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Search Tags
                </label>
                <Input
                  placeholder="Search for tags..."
                  className="h-12 rounded-lg bg-white border-gray-200"
                />
                <p className="text-[11px] text-gray-400 mt-2 font-medium">
                  Select tags to categorize this content
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest text-[10px]">
                  Available Tags
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      onClick={() =>
                        !tags.includes(tag) && setTags([...tags, tag])
                      }
                      className={`h-9 px-6 rounded-full font-bold transition-all border-none ${tags.includes(tag) ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Area */}
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-[32px] p-10 border border-gray-200 shadow-sm space-y-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Status</h3>
              <div className="flex justify-between items-center mb-10">
                <span className="text-gray-500 font-medium">
                  Current status
                </span>
                <Tag
                  color="#FFF8C5"
                  className="text-[#9A6700] border-none font-bold text-xs rounded-lg px-4 py-1 m-0"
                >
                  Draft
                </Tag>
              </div>
              <div className="space-y-3">
                <Button
                  type="primary"
                  block
                  className="h-12 bg-[#2563EB] rounded-xl font-bold text-base"
                >
                  Publish
                </Button>
                <Button
                  block
                  className="h-12 border-gray-200 rounded-xl font-bold text-base text-gray-700"
                >
                  Save as Draft
                </Button>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Info</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Content Type
                    </p>
                    <p className="text-sm font-bold text-gray-900">Product</p>
                  </div>
                  <Button
                    type="link"
                    className="text-[#2563EB] font-bold p-0 text-xs"
                  >
                    View Content Type
                  </Button>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Description
                  </p>
                  <p className="text-sm font-bold text-gray-700 leading-relaxed">
                    Product Listings and Details
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Entry ID
                  </p>
                  <p className="text-xs font-mono text-gray-500">
                    2SBuTLOQBaYn2gviWmMObk
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Content Type ID
                  </p>
                  <p className="text-sm font-bold text-gray-900">product</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Created
                  </p>
                  <p className="text-sm font-bold text-gray-700">1 week ago</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Created by
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="bg-blue-50 text-[#2563EB]"
                    />
                    <span className="text-sm font-bold text-gray-900">
                      User 1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {activeTab === 'tags' && tags.length > 0 && (
              <div className="pt-10 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">
                  Selected Tags
                </h3>
                <div className="space-y-3">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100"
                    >
                      <span className="text-xs font-bold text-[#2563EB]">
                        {tag}
                      </span>
                      <CloseOutlined
                        className="text-[#2563EB] cursor-pointer text-xs"
                        onClick={() => setTags(tags.filter((t) => t !== tag))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
