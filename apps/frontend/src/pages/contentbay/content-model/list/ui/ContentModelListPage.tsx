import React from 'react';
import { ContentModelHeader } from '@features/content-model/components/ContentModelHeader';
import { ContentModelGrid } from '@features/content-model/components/ContentModelGrid';

const ContentModelListPage: React.FC = () => {
  return (
    <div className="p-12 max-w-[1400px] mx-auto">
      <ContentModelHeader />
      <ContentModelGrid />
    </div>
  );
};

export default ContentModelListPage;
