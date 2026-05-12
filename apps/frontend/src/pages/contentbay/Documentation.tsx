import React, { useState } from 'react';
import { Collapse, Button } from 'antd';
import CTASection from '@/shared/components/layout/contentbay/CTASection';

const { Panel } = Collapse;

const Documentation: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>(['1']);

  const docs = [
    {
      id: '1',
      title: '1. Installation',
      subtitle: 'Set up the ContentBay SDK or use the REST API with fetch',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">To interact with the ContentBay API, you can use the browser's built-in fetch API or Node.js fetch, or optionally install the ContentBay SDK helper library:</p>
          <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm relative group">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
              <span className="text-slate-400">bash</span>
              <button className="text-slate-400 hover:text-white transition-colors">Copy</button>
            </div>
            <p className="text-blue-300">npm <span className="text-white">install contentbay-sdk</span></p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">!</div>
            <p className="text-sm text-blue-800"><span className="font-bold">Optional:</span> The SDK is optional. You can also use the REST API directly with fetch without any installation.</p>
          </div>
        </div>
      )
    },
    {
      id: '2',
      title: '2. Configuration & Authentication',
      subtitle: 'Set up your API credentials and environment variables',
      content: <p className="text-slate-600">Configure your project with the API keys provided in your dashboard...</p>
    },
    {
      id: '3',
      title: '3. Content Modeling (The Blueprint)',
      subtitle: 'Define your content structure before creating entries',
      content: <p className="text-slate-600">Start by creating your first content model using the visual builder...</p>
    },
    {
      id: '4',
      title: '4. API Basics: Fetching Content',
      subtitle: 'Learn how to retrieve and display your content',
      content: <p className="text-slate-600">Use our powerful query engine to fetch exactly the data you need...</p>
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Documentation Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Documentation</span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">Learn everything you need <br />to <span className="text-blue-600">build fast</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive guides, API references, and examples to get you building with ContentBay in minutes.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Getting Started with ContentBay</h2>
            <p className="text-slate-500">Everything you need is in one place</p>
          </div>
          
          <Collapse 
            activeKey={activeKey} 
            onChange={setActiveKey}
            expandIconPosition="end"
            className="bg-transparent border-none space-y-6"
            ghost
          >
            {docs.map((doc) => (
              <Panel 
                header={
                  <div className="py-4">
                    <h3 className="text-2xl font-bold text-slate-900">{doc.title}</h3>
                    <p className="text-slate-500 font-normal mt-1">{doc.subtitle}</p>
                  </div>
                } 
                key={doc.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ marginBottom: '24px', borderLeft: doc.id === '1' ? '4px solid #2563eb' : doc.id === '2' ? '4px solid #a855f7' : doc.id === '3' ? '4px solid #22c55e' : '4px solid #ec4899' }}
              >
                <div className="px-6 pb-8">
                  {doc.content}
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Documentation;
