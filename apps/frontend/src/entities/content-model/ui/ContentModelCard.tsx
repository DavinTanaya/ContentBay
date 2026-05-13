import type { FC, ReactNode } from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface ContentModelCardProps {
  model: {
    id: string;
    name: string;
    fields: number;
    desc: string;
    icon: ReactNode;
    color: string;
    lastUpdate: string;
  };
  onClick?: (id: string) => void;
}

export const ContentModelCard: FC<ContentModelCardProps> = ({
  model,
  onClick,
}) => {
  return (
    <Card
      hoverable
      className="rounded-[24px] border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all cursor-pointer"
      bodyStyle={{ padding: 0 }}
      onClick={() => onClick?.(model.id)}
    >
      <div className="p-8">
        <div className="w-12 h-12 rounded-xl bg-blue-1 flex items-center justify-center mb-6">
          <span className="text-2xl text-blue-7">{model.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{model.name}</h3>
        <p className="text-sm text-gray-500 font-medium mb-4">
          {model.fields} fields
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {model.desc}
        </p>
      </div>
      <div className="px-8 py-6 bg-white border-t border-gray-100 flex items-center gap-3">
        <Avatar
          size="small"
          icon={<UserOutlined style={{ color: 'var(--blue-7)' }} />}
          style={{
            backgroundColor: 'var(--blue-1)',
          }}
        />
        <div>
          <p className="text-[11px] font-bold text-gray-900">User 1</p>
          <p className="text-[11px] text-gray-500">{model.lastUpdate}</p>
        </div>
      </div>
    </Card>
  );
};
