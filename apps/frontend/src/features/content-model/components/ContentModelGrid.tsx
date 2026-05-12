import React from 'react';
import { FileTextOutlined, CalendarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ContentModelCard } from './ContentModelCard';

export const ContentModelGrid: React.FC = () => {
  const models = [
    { id: 'article', name: 'Article', fields: 12, desc: 'Blog posts and news articles', icon: <FileTextOutlined />, color: '#2563EB', lastUpdate: '2 days ago' },
    { id: 'product', name: 'Product', fields: 18, desc: 'E-commerce product items', icon: <ShoppingCartOutlined />, color: '#2563EB', lastUpdate: '5 hours ago' },
    { id: 'event', name: 'Event', fields: 15, desc: 'Upcoming events and conferences', icon: <CalendarOutlined />, color: '#2563EB', lastUpdate: '1 week ago' },
    { id: 'event-2', name: 'Event', fields: 15, desc: 'Upcoming events and conferences', icon: <CalendarOutlined />, color: '#2563EB', lastUpdate: '1 week ago' },
    { id: 'article-2', name: 'Article', fields: 12, desc: 'Blog posts and news articles', icon: <FileTextOutlined />, color: '#2563EB', lastUpdate: '2 days ago' },
    { id: 'product-2', name: 'Product', fields: 18, desc: 'Blog posts and news articles', icon: <ShoppingCartOutlined />, color: '#2563EB', lastUpdate: '5 hours ago' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {models.map((model) => (
        <ContentModelCard key={model.id} model={model} />
      ))}
    </div>
  );
};
