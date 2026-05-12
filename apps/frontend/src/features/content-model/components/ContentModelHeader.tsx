import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined, ApartmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const ContentModelHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};
