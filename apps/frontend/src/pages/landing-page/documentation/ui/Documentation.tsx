import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import {
  BookOutlined,
  SettingOutlined,
  CodeOutlined,
  SafetyOutlined,
  CopyOutlined,
  CheckOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';

// Custom CodeBlock component with copy to clipboard functionality
const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      message.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.error('Failed to copy code');
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden my-6 font-mono text-sm relative group">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-poppins">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
        >
          {copied ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-slate-200 leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

// Documentation layout sections
interface DocSection {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function Documentation() {
  const [activeSectionId, setActiveSectionId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections: DocSection[] = [
    {
      id: 'intro',
      title: 'Introduction',
      category: 'GETTING STARTED',
      icon: <BookOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Introduction</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            ContentBay is a modern, developer-first headless CMS designed to power fast, multi-tenant digital experiences. It provides an intuitive schema modeler, secure workspace environments, and high-performance delivery APIs to deliver content across web, mobile, and IoT devices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2 font-poppins">
                <DatabaseOutlined className="text-blue-600" /> Schema Modeler
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-poppins">
                Define fields dynamically (Text, Date, Boolean, References) and generate instant GraphQL schemas mapped to your workspace.
              </p>
            </div>
            <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2 font-poppins">
                <DeploymentUnitOutlined className="text-purple-600" /> JavaScript SDK
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-poppins">
                Fetch published entries, apply queries, selects, custom filtering, and pagination using a fluent builder syntax.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4 my-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm font-poppins">
              i
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-blue-900 text-sm font-poppins">Key Architecture Concept</h4>
              <p className="text-sm text-blue-800 leading-relaxed font-poppins">
                All content types (Models) and records (Entries) are strictly bound to a workspace context. The SDK queries are scoped using a Workspace ID and authorized via cryptographically secure SHA-256 API tokens.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'install',
      title: 'Installation',
      category: 'GETTING STARTED',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Installation</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            ContentBay offers a thin, high-performance client helper SDK for JavaScript and TypeScript projects. Install it from the npm registry using your preferred package manager:
          </p>

          <CodeBlock
            language="bash"
            code={`# Install via npm
npm install contentbay

# Install via pnpm
pnpm add contentbay

# Install via yarn
yarn add contentbay`}
          />

          <p className="text-slate-600 leading-relaxed font-poppins">
            The package is built with native ESModules and CommonJS exports and packages full TypeScript types out of the box.
          </p>
        </div>
      ),
    },
    {
      id: 'config',
      title: 'Configuration',
      category: 'GETTING STARTED',
      icon: <SettingOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Configuration & Auth</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            To query content, initialize the client using your **Workspace ID** and **API Token**. Generate keys from your dashboard under the `Settings &gt; API Tokens` panel.
          </p>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4 my-6">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900 text-sm font-poppins">Keep Keys Confidential</h4>
              <p className="text-sm text-amber-800 leading-relaxed font-poppins">
                Your API tokens (`cms_sk_...`) grant read access to your workspace content. Never expose them on client-side code blocks. Always initialize them using environment variables.
              </p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed font-poppins">
            Store credentials in your environment configuration file:
          </p>
          <CodeBlock
            language="env"
            code={`CONTENTBAY_SPACE_ID="your_workspace_id"
CONTENTBAY_API_TOKEN="cms_sk_your_api_token"`}
          />

          <p className="text-slate-600 leading-relaxed font-poppins">
            Initialize the Client in your codebase:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { ContentBay } from 'contentbay';

const cms = new ContentBay({
  spaceId: process.env.CONTENTBAY_SPACE_ID,
  apiToken: process.env.CONTENTBAY_API_TOKEN,
});`}
          />
        </div>
      ),
    },
    {
      id: 'sdk-getAll',
      title: 'Fetching All Entries',
      category: 'SDK REFERENCE',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Fetching All Entries</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            Use `getAll()` to retrieve all published records from a specific content model in your workspace.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Fetch all published records for the content model 'blog-post'
const posts = await cms.getAll('blog-post');

posts.forEach(post => {
  console.log(\`Title: \${post.data.title}\`);
  console.log(\`Published: \${post.createdAt}\`);
});`}
          />
        </div>
      ),
    },
    {
      id: 'sdk-getOne',
      title: 'Fetching Single Entry',
      category: 'SDK REFERENCE',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Fetching Single Entry</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            Retrieve a single, specific published content entry using its content model API ID and the unique record ID:
          </p>
          <CodeBlock
            language="typescript"
            code={`const entryId = 'cmq6lw6pc000jb9joiohojdj';
const car = await cms.getOne('cars', entryId);

if (car) {
  console.log(\`Model Name: \${car.data.name}\`);
} else {
  console.log('Entry not found or not published.');
}`}
          />
        </div>
      ),
    },
    {
      id: 'query-builder',
      title: 'Query Builder',
      category: 'QUERY BUILDER',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Query Builder</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            ContentBay packages a powerful chainable `QueryBuilder` for advanced filtering, sorting, selecting, and pagination.
          </p>

          <CodeBlock
            language="typescript"
            code={`const results = await cms.query('product')
  .where('price', '>=', 100)
  .where('category', '=', 'electronics')
  .select(['name', 'price', 'brand'])
  .orderBy('price', 'desc')
  .limit(10)
  .offset(20)
  .execute();`}
          />

          <h3 className="text-xl font-bold text-slate-800 font-poppins mt-8 mb-4">Supported Operators</h3>
          <p className="text-slate-600 leading-relaxed mb-4 font-poppins">
            The `.where()` method supports multiple operators:
          </p>
          <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm my-4 font-poppins">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Operator</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-mono font-bold text-blue-600">'='</td>
                  <td className="p-4">Strict equality check</td>
                  <td className="p-4 font-mono">.where('status', '=', 'active')</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-blue-600">'!='</td>
                  <td className="p-4">Not equal comparison</td>
                  <td className="p-4 font-mono">.where('role', '!=', 'admin')</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-blue-600">{"'>', '<', '>=', '<='"}</td>
                  <td className="p-4">Numeric comparisons</td>
                  <td className="p-4 font-mono">{".where('price', '<', 50.5)"}</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-blue-600">'contains'</td>
                  <td className="p-4">String substring inclusion</td>
                  <td className="p-4 font-mono">.where('title', 'contains', 'react')</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-blue-600">'startsWith', 'endsWith'</td>
                  <td className="p-4">String boundary prefix matches</td>
                  <td className="p-4 font-mono">.where('slug', 'startsWith', '/blog/')</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'graphql-api',
      title: 'GraphQL API',
      category: 'ADVANCED REFERENCE',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">GraphQL API</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            For languages other than JavaScript/TypeScript, you can perform queries by issuing HTTP POST requests directly to our GraphQL endpoint.
          </p>

          <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 my-6 font-poppins">
            <p className="text-sm font-semibold text-slate-700 mb-1">HTTP POST URL:</p>
            <code className="text-sm font-mono text-blue-600 block bg-white border border-slate-100 p-2.5 rounded-lg select-all">
              https://api.contentbay.tech/
            </code>
          </div>

          <p className="text-slate-600 leading-relaxed font-poppins">
            Make sure to supply your workspace token in the headers:
          </p>
          <CodeBlock
            language="bash"
            code={`curl -X POST https://api.contentbay.tech/ \\
  -H "Content-Type: application/json" \\
  -H "x-contentbay-token: your_api_token" \\
  -d '{"query": "query { deliveryGetModels { id name apiId } }"}'`}
          />
        </div>
      ),
    },
    {
      id: 'ai-vibe',
      title: 'AI Vibe Coding (CLI)',
      category: 'GETTING STARTED',
      icon: <CodeOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">AI Vibe Coding (CLI)</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            ContentBay offers a revolutionary "Vibe Coding" interface that allows you to configure your entire backend structure and generate custom SDK query scripts using natural language prompts.
          </p>

          <h3 className="text-xl font-bold text-slate-800 font-poppins">Running the CLI</h3>
          <p className="text-slate-600 leading-relaxed font-poppins">
            To provision models and get customized scripts directly in your project folder, run the prompt command:
          </p>
          <CodeBlock
            language="bash"
            code={`npx contentbay prompt "I want to build a bookstore with book titles, authors, and prices"`}
          />

          <h3 className="text-xl font-bold text-slate-800 font-poppins">Configuring Space ID & API Token</h3>
          <p className="text-slate-600 leading-relaxed font-poppins">
            To authorize the CLI to make changes in your workspace, you must provide your **Space ID** and **API Token**. You can do this in two ways:
          </p>

          <h4 className="font-bold text-slate-700 text-sm font-poppins">Method 1: Using a Local .env File (Recommended)</h4>
          <p className="text-slate-600 leading-relaxed font-poppins">
            Create a file named <code>.env</code> in your project root directory and add the following keys:
          </p>
          <CodeBlock
            language="env"
            code={`CONTENTBAY_SPACE_ID="your_workspace_id"
CONTENTBAY_API_TOKEN="cms_sk_your_api_token"`}
          />
          <p className="text-slate-500 text-xs font-poppins mb-4">
            *Note: The CLI will automatically scan and load these variables from the local directory when run.*
          </p>

          <h4 className="font-bold text-slate-700 text-sm font-poppins">Method 2: Using Command-Line Flags</h4>
          <p className="text-slate-600 leading-relaxed font-poppins">
            Pass the credentials directly as flags when running the command:
          </p>
          <CodeBlock
            language="bash"
            code={`npx contentbay prompt "Create a bookstore..." --space <workspace_id> --token <api_token>`}
          />

          <h3 className="text-xl font-bold text-slate-800 font-poppins">Incremental Chat Session Memory</h3>
          <p className="text-slate-600 leading-relaxed font-poppins">
            The CLI automatically persists your conversation history in a local <code>.contentbay-session.json</code> file. This enables context awareness, meaning you can follow up with edits and modifications in subsequent commands:
          </p>
          <CodeBlock
            language="bash"
            code={`# Step 1: Initialize your models
npx contentbay prompt "Create a blog with posts and categories"

# Step 2: Follow up to add a new field (retains previous context)
npx contentbay prompt "Add a date field publishedAt to the posts model"`}
          />

          <h3 className="text-xl font-bold text-slate-800 font-poppins">Generated Client Scripts</h3>
          <p className="text-slate-600 leading-relaxed font-poppins">
            On success, the CLI writes a local file named <code>contentbay-client.js</code> containing pre-written SDK helper functions to fetch and query your newly created content models.
          </p>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security Practices',
      category: 'ADVANCED REFERENCE',
      icon: <SafetyOutlined />,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">Security Best Practices</h2>
          <p className="text-base text-slate-600 leading-relaxed font-poppins">
            Deploying securely is critical to preventing unauthorized modifications or scrapings of your schemas. Follow these instructions:
          </p>
          <ul className="list-disc pl-6 space-y-4 text-slate-600 font-poppins">
            <li>
              <strong>Server-Side Fetching (Recommended)</strong>: Call the ContentBay SDK within serverless functions, Next.js API routes, or backend microservices. Do not expose `cms_sk_...` keys directly to browser clients.
            </li>
            <li>
              <strong>Token Rotation</strong>: Revoke old API tokens and generate replacement keys via your Workspace dashboard if you suspect a key has been compromised.
            </li>
            <li>
              <strong>HTTPS Delivery</strong>: The SDK forces HTTPS encryption to secure payloads and header-based keys in transit. Do not modify connections to plain text HTTP.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // Group sections by category
  const categories = Array.from(new Set(sections.map((s) => s.category)));

  // Filter sections by search query
  const filteredSections = sections.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );
  });

  const activeDoc = sections.find((s) => s.id === activeSectionId) || sections[0];

  return (
    <div className="bg-[#FAFBFD] min-h-[calc(100vh-64px)] flex flex-col">
      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">C</span>
          <span className="font-bold text-slate-900 text-sm tracking-tight font-poppins">ContentBay Docs</span>
        </div>
        <Button
          type="text"
          icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center"
        />
      </div>

      <div className="flex grow w-full relative bg-white lg:pl-[320px]">
        
        {/* Left Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30
            w-[320px] bg-slate-50 border-r border-slate-100 py-8 lg:pl-14 lg:pr-6 px-6 select-none overflow-y-auto
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:translate-x-0 lg:block
          `}
        >
          {/* Mock Search Bar */}
          <div className="mb-8">
            <Input
              placeholder="Quick search..."
              prefix={<SearchOutlined className="text-slate-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl bg-slate-50 border-slate-100 focus:bg-white hover:border-slate-200 font-poppins text-xs"
              allowClear
            />
          </div>

          {/* Navigation links grouped by category */}
          <div className="space-y-8 font-poppins">
            {categories.map((cat) => {
              const catSections = filteredSections.filter((s) => s.category === cat);
              if (catSections.length === 0) return null;

              return (
                <div key={cat}>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    {cat}
                  </h4>
                  <div className="space-y-1">
                    {catSections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setActiveSectionId(sec.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs font-semibold tracking-tight transition-all cursor-pointer border-none outline-none
                          ${
                            sec.id === activeSectionId
                              ? 'bg-blue-50 text-blue-700 shadow-sm'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                          }
                        `}
                      >
                        <span className="text-sm shrink-0">{sec.icon}</span>
                        <span className="line-clamp-1">{sec.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Backdrop for mobile menu */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-20 lg:hidden"
          />
        )}

        {/* Middle Reading Panel */}
        <main className="flex-grow p-6 lg:p-12 lg:pl-16 lg:pr-16 min-w-0 max-w-[850px] bg-white">
          <article className="prose prose-slate max-w-none">
            {activeDoc.content}
          </article>
        </main>

        {/* Right Table of Contents Panel (Desktop Only) */}
        <aside className="hidden xl:block w-[240px] shrink-0 p-8 pt-12 select-none sticky top-[64px] h-[calc(100vh-64px)] self-start font-poppins">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            On this page
          </h4>
          <ul className="space-y-3 text-xs leading-relaxed text-slate-500">
            <li className="font-bold text-blue-600 transition-colors">
              <a href="#" className="hover:text-blue-700 cursor-pointer">
                Overview & Guidelines
              </a>
            </li>
            <li className="hover:text-slate-800 transition-colors pl-3 border-l border-slate-100">
              <a href="#" className="cursor-pointer">Code Implementation</a>
            </li>
            <li className="hover:text-slate-800 transition-colors pl-3 border-l border-slate-100">
              <a href="#" className="cursor-pointer">Alternative Integration</a>
            </li>
            <li className="hover:text-slate-800 transition-colors pl-3 border-l border-slate-100">
              <a href="#" className="cursor-pointer">Best Practices</a>
            </li>
          </ul>
        </aside>

      </div>
    </div>
  );
}
