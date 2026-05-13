import { useState } from 'react';
import { Input, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useCreateContentModel } from '../model/useCreateContentModel';

interface ContentModelCreateFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ContentModelCreateForm = ({
  onBack,
  onSuccess,
}: ContentModelCreateFormProps) => {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [description, setDescription] = useState('');

  const { create, loading } = useCreateContentModel(onSuccess);

  const formatToApiId = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join('');
  };

  const handleCreate = () => {
    if (!name || !apiId) return;
    create({ name, apiId, description });
  };

  return (
    <div className="bg-gray-3 min-h-[calc(100vh-72px)] p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-2xl">
            <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              Create New Content Model
            </h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Define the structure for your content. A content type acts as a
              template for your entries.
            </p>
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center">
            <RocketOutlined className="text-[#2563EB] text-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 p-16 shadow-2xl shadow-blue-900/5 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-10">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Name
                </label>
                <Input
                  placeholder="e.g. Blog Post"
                  value={name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setName(newName);
                    setApiId(formatToApiId(newName));
                  }}
                  className="h-14 rounded-2xl bg-gray-50/50 border-gray-100 hover:border-[#2563EB] focus:border-[#2563EB] text-gray-900 font-bold px-6"
                />
                <p className="text-[11px] text-gray-400 mt-3 font-medium">
                  Appear in the menu and entry lists
                </p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  API Identifier
                </label>
                <Input
                  placeholder="e.g. blogPost"
                  value={apiId}
                  onChange={(e) => setApiId(e.target.value)}
                  className="h-14 rounded-2xl bg-gray-50 border-gray-100 text-gray-400 font-mono text-sm px-6"
                />
                <p className="text-[11px] text-gray-400 mt-3 font-medium">
                  Used in API responses. Auto-generated from name.
                </p>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                Description
              </label>
              <Input.TextArea
                placeholder="What is this content type used for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="rounded-3xl bg-gray-50/50 border-gray-100 hover:border-[#2563EB] focus:border-[#2563EB] p-6 text-gray-700 font-medium leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-10 border-t border-gray-100 flex justify-end gap-4">
            <button
              className="h-14 px-10 rounded-2xl font-bold border border-gray-100 text-gray-500 hover:text-gray-700 transition-all"
              onClick={onBack}
            >
              Cancel
            </button>
            <Button
              type="primary"
              loading={loading}
              disabled={!name || loading}
              className="h-14 px-12 rounded-2xl font-bold bg-[#2563EB] hover:bg-[#1d4ed8] border-none shadow-xl shadow-blue-600/20 text-base"
              onClick={handleCreate}
            >
              Create & Add Fields
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
