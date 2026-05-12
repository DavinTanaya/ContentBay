import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ContentModelCardProps {
  model: {
    id: string;
    name: string;
    fields: number;
    desc: string;
    icon: React.ReactNode;
    color: string;
    lastUpdate: string;
  };
}

export const ContentModelCard: React.FC<ContentModelCardProps> = ({ model }) => {
  const navigate = useNavigate();

  return (
    <Card 
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
  );
};
