import React from 'react';
import { Input, Button, Card, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, ApartmentOutlined, FileTextOutlined, CalendarOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ContentModelList: React.FC = () => {
  const navigate = useNavigate();

  const models = [
    { id: 'article', name: 'Article', fields: 12, desc: 'Blog posts and news articles', icon: <FileTextOutlined />, color: '#2563EB', lastUpdate: '2 days ago' },
    { id: 'product', name: 'Product', fields: 18, desc: 'E-commerce product items', icon: <ShoppingCartOutlined />, color: '#2563EB', lastUpdate: '5 hours ago' },
    { id: 'event', name: 'Event', fields: 15, desc: 'Upcoming events and conferences', icon: <CalendarOutlined />, color: '#2563EB', lastUpdate: '1 week ago' },
    { id: 'event-2', name: 'Event', fields: 15, desc: 'Upcoming events and conferences', icon: <CalendarOutlined />, color: '#2563EB', lastUpdate: '1 week ago' },
    { id: 'article-2', name: 'Article', fields: 12, desc: 'Blog posts and news articles', icon: <FileTextOutlined />, color: '#2563EB', lastUpdate: '2 days ago' },
    { id: 'product-2', name: 'Product', fields: 18, desc: 'Blog posts and news articles', icon: <ShoppingCartOutlined />, color: '#2563EB', lastUpdate: '5 hours ago' },
  ];

  return (
    <div className="p-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Content Model</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input 
            placeholder="input search text" 
            suffix={<SearchOutlined className="text-gray-400" />} 
            className="w-full sm:w-64 h-11 rounded-lg border-gray-200"
          />
          <Button className="h-11 px-6 font-bold text-gray-700 rounded-lg border-gray-200 flex items-center gap-2">
            <ApartmentOutlined /> Visual Modeler
          </Button>
          <Button 
            type="primary" 
            className="h-11 px-6 font-bold bg-[#2563EB] rounded-lg flex items-center gap-2"
            onClick={() => navigate('/content-model/create')}
          >
            <PlusOutlined /> Create Content Type
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <Card 
            key={model.id}
            hoverable
            className="rounded-[24px] border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all cursor-pointer"
            bodyStyle={{ padding: 0 }}
            onClick={() => navigate(`/content-model/${model.id}`)}
          >
            <div className="p-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <span className="text-2xl text-[#2563EB]">{model.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{model.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">{model.fields} fields</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {model.desc}
              </p>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-6 bg-white border-t border-gray-100 flex items-center gap-3">
              <Avatar size="small" icon={<UserOutlined />} className="bg-blue-100 text-blue-600" />
              <div>
                <p className="text-[11px] font-bold text-gray-900">User 1</p>
                <p className="text-[11px] text-gray-500">{model.lastUpdate}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentModelList;
