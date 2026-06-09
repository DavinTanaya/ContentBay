import React, { useState } from 'react';
import { Modal, Input, Button, Spin, message, Alert } from 'antd';
import { RobotOutlined, CopyOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client/react';
import { GENERATE_AI_MODELS } from '@/entities/content-model';
import { GET_CONTENT_MODELS } from '@/entities/content-model/api/queries';

export function AiModelerModal({
  workspaceId,
  open,
  onClose,
}: {
  workspaceId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [copied, setCopied] = useState(false);

  const [generateAIModels, { loading, data }] = useMutation(GENERATE_AI_MODELS, {
    refetchQueries: [{ query: GET_CONTENT_MODELS }],
    onError: (err) => {
      message.error(err.message || 'AI Generation failed');
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      message.warning('Please enter a description for your structure');
      return;
    }

    try {
      const response = await generateAIModels({
        variables: {
          workspaceId,
          prompt: prompt.trim(),
          history: history.map(h => ({ role: h.role, content: h.content })),
        },
      });

      const result = response.data?.generateAIModels;
      if (result) {
        if (result.success) {
          message.success(result.message);
          // Append user prompt and response message to history to keep session context active
          setHistory((prev) => [
            ...prev,
            { role: 'user', content: prompt.trim() },
            { role: 'assistant', content: result.message },
          ]);
          setPrompt(''); // Clear prompt for next instruction
        } else {
          message.warning(result.message); // Refusal by safeguard
        }
      }
    } catch {
      // Handled by Apollo onError
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      message.success('SDK Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.error('Failed to copy code');
    }
  };

  const result = data?.generateAIModels;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-geekblue-7 text-lg font-poppins">
          <RobotOutlined className="text-xl" />
          <span>ContentBay AI Modeler</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} size="middle">
          Close
        </Button>,
      ]}
      width={720}
      className="font-poppins"
    >
      <div className="flex flex-col gap-6 py-4">
        <p className="text-xs text-gray-6 leading-relaxed">
          Describe the database schema you want to build (e.g. <i>"I want to build a real estate portal with properties, agents, and reviews"</i>). ContentBay AI will automatically provision the tables/fields in your workspace and generate client-side queries.
        </p>

        {history.length > 0 && (
          <div className="flex flex-col gap-3 max-h-48 overflow-y-auto bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs">
            <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Conversation History</span>
            {history.filter(m => m.role === 'user').map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                <span className="font-semibold text-slate-750">You: {msg.content}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input.TextArea
            placeholder="What would you like to build? (e.g. 'Add a tag field to posts', 'Create a bookstore')"
            autoSize={{ minRows: 2, maxRows: 4 }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            className="rounded-xl border-slate-200 focus:border-geekblue-5 focus:shadow-md text-xs font-poppins"
            onPressEnter={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
          <Button
            type="primary"
            onClick={handleGenerate}
            loading={loading}
            icon={<SendOutlined />}
            className="h-auto flex flex-col justify-center items-center bg-geekblue-6 hover:bg-geekblue-5 rounded-xl px-5"
          >
            Send
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Spin size="large" className="text-geekblue-6" />
            <span className="text-sm font-semibold text-slate-600 animate-pulse">
              ContentBay AI is provisioning your models...
            </span>
          </div>
        )}

        {result && !loading && (
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 animate-fade-in">
            {result.success ? (
              <>
                <Alert
                  message="Schema Provisioned Successfully!"
                  description={result.message}
                  type="success"
                  showIcon
                  className="rounded-xl text-xs"
                />

                {result.models && result.models.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-600">Created / Updated Models:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.models.map((model: any, idx: number) => (
                        <div key={idx} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                          <span className="font-bold text-slate-800 text-xs">{model.name}</span>
                          <span className="text-[10px] text-slate-400 block mb-1">API ID: {model.apiId}</span>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {model.fields.map((f: any, fidx: number) => (
                              <span key={fidx} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                {f.name} ({f.type})
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.sdkCode && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-600">Generated SDK Client Code:</span>
                      <Button
                        type="text"
                        size="small"
                        icon={copied ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
                        onClick={() => handleCopyCode(result.sdkCode)}
                        className="text-[11px] text-geekblue-6"
                      >
                        {copied ? 'Copied' : 'Copy Code'}
                      </Button>
                    </div>
                    <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-slate-200 text-xs overflow-x-auto max-h-48 leading-relaxed">
                      <code>{result.sdkCode}</code>
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <Alert
                message="AI Request Blocked (Safeguard)"
                description={result.message}
                type="warning"
                showIcon
                className="rounded-xl text-xs"
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
