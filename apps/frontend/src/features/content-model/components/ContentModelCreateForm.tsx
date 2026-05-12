import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { ArrowLeftOutlined, RocketOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client/react';
import { CREATE_CONTENT_MODEL } from '../../../graphql/mutations/content-model';
import { GET_CONTENT_MODELS } from '../../../graphql/queries/content-model';

export const ContentModelCreateForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [description, setDescription] = useState('');

  const [createModel, { loading }] = useMutation(CREATE_CONTENT_MODEL, {
    refetchQueries: [GET_CONTENT_MODELS],
    onCompleted: () => {
      message.success('Content Model created successfully!');
      navigate('/content-model');
    },
    onError: (error) => {
      message.error(error.message || 'Failed to create Content Model');
    },
  });

  // Auto-generate API Identifier from Name
  useEffect(() => {
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join('');
    setApiId(generated);
  }, [name]);

  const handleCreate = () => {
    if (!name || !apiId) return;
    createModel({
      variables: {
        input: {
          name,
          apiId,
          description,
        },
      },
    });
  };

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100vh-72px)] p-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/content-model')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors group"
        >
          <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{' '}
          Back to Content Models
        </button>

        <div className="flex justify-between items-start mb-12">
          <div className="max-w-2xl">
            <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-4">
              Create New Content Model
            </h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Define the structure for your content. A content type acts as a
              template for your entries.
            </p>
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center">
            <RocketOutlined className="text-[#2563EB] text-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-200 p-16 shadow-sm shadow-blue-900/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-10">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Name
                </label>
                <Input
                  placeholder="e.g. Blog Post"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

          <div className="pt-10 border-t border-gray-50 flex justify-end gap-4">
            <button
              className="h-14 px-10 rounded-2xl font-bold border border-gray-200 text-gray-500 hover:text-gray-700 transition-all"
              onClick={() => navigate('/content-model')}
            >
              Cancel
            </button>
            <Button
              type="primary"
              disabled={!name}
              className="h-14 px-12 rounded-2xl font-bold bg-[#2563EB] hover:bg-[#1d4ed8] border-none shadow-xl shadow-blue-600/20 text-base"
              onClick={handleCreate}
            >
              Create & Add Fields
            </Button>
          </div>
        </div>

        {/* Tip Card */}
        <div className="mt-12 p-8 bg-[#2563EB]/5 rounded-[32px] border border-[#2563EB]/10 flex items-start gap-6">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <RocketOutlined className="text-[#2563EB] text-lg" />
          </div>
          <div>
            <h4 className="text-[#2563EB] font-bold text-sm mb-1 tracking-tight">
              Pro Tip
            </h4>
            <p className="text-[#2563EB]/60 text-xs font-medium leading-relaxed">
              Start with a clear name. You can always change the display name
              later, but the API identifier is permanent to ensure your
              applications don't break.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
