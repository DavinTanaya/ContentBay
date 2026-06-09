import { useState } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export function GettingStartedAccordion() {
  const [activeKey, setActiveKey] = useState<string | string[]>(['1']);

  const docs = [
    {
      id: '1',
      title: '1. Installation',
      subtitle: 'Set up the ContentBay SDK or use the GraphQL API directly',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">
            To interact with the ContentBay API, you can install the official
            ContentBay client helper library:
          </p>
          <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm relative group">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
              <span className="text-slate-400">bash</span>
            </div>
            <p className="text-blue-300">
              npm <span className="text-white">install contentbay</span>
            </p>
            <p className="text-blue-300 mt-2">
              pnpm <span className="text-white">add contentbay</span>
            </p>
            <p className="text-blue-300 mt-2">
              yarn <span className="text-white">add contentbay</span>
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              i
            </div>
            <p className="text-sm text-blue-800">
              <span className="font-bold">Alternative:</span> The SDK is a thin helper wrapper.
              You can also make raw GraphQL or HTTP POST requests to the ContentBay endpoint.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: '2',
      title: '2. Configuration & Authentication',
      subtitle: 'Set up your API credentials and environment variables',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">
            Initialize the client using your workspace ID (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-sm text-slate-800">spaceId</code>) and 
            the API key (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-sm text-slate-800">apiToken</code>) generated under your Workspace dashboard.
          </p>
          <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm relative group">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
              <span className="text-slate-400">typescript</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto">
{`import { ContentBay } from 'contentbay';

const cms = new ContentBay({
  spaceId: 'your-workspace-id',
  apiToken: 'cb_live_your-api-token'
});`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: '3',
      title: '3. Content Modeling (The Blueprint)',
      subtitle: 'Define your content structure before creating entries',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">
            Create models (like <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-sm text-slate-800">product</code> or <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-sm text-slate-800">blog-post</code>) using the visual schema modeler in your dashboard.
            You can add fields of various types:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Text / Rich Text:</strong> Titles, descriptions, markdown, or formatted content.</li>
            <li><strong>Number / Boolean / Date:</strong> Prices, options, visibility toggles, and timestamps.</li>
            <li><strong>Asset:</strong> Images, files, and other media uploads.</li>
            <li><strong>Reference:</strong> Create relations between different content entries.</li>
            <li><strong>JSON:</strong> Store custom structured config values directly.</li>
          </ul>
        </div>
      ),
    },
    {
      id: '4',
      title: '4. API Basics: Fetching Content',
      subtitle: 'Learn how to retrieve and display your content',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">
            Retrieve entries by their model IDs or search them using the powerful client-side Query Builder.
          </p>
          <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm relative group">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
              <span className="text-slate-400">typescript</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto">
{`// 1. Get all entries of a model
const products = await cms.getAll('product');

// 2. Get a single entry by ID
const product = await cms.getOne('product', 'clxyz123');

// 3. Chain conditions with the Query Builder
const electronics = await cms.query('product')
  .where('category', '=', 'electronics')
  .where('price', '<=', 500)
  .select(['name', 'price', 'image'])
  .orderBy('price', 'desc')
  .limit(10)
  .execute();`}
            </pre>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Getting Started with ContentBay
          </h2>
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
                  <h3 className="text-2xl font-bold text-slate-900">
                    {doc.title}
                  </h3>
                  <p className="text-slate-500 font-normal mt-1">
                    {doc.subtitle}
                  </p>
                </div>
              }
              key={doc.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              style={{
                marginBottom: '24px',
                borderLeft:
                  doc.id === '1'
                    ? '4px solid #2563eb'
                    : doc.id === '2'
                      ? '4px solid #a855f7'
                      : doc.id === '3'
                        ? '4px solid #22c55e'
                        : '4px solid #ec4899',
              }}
            >
              <div className="px-6 pb-8">{doc.content}</div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
}
