import React from 'react';
import { useGetContentModelsApi } from '@/entities/content-model/hooks/useContentModelQueries';
import { VisualModelerCanvas } from '@/widgets/visual-model-canvas';
import { Spin, Result, Button } from 'antd';
import { ArrowLeftOutlined, ApartmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkspaceId } from '@/entities/workspace';
import { getContentModelPath } from '@/shared/constants/routes';

const VisualModelerPage: React.FC = () => {
  const navigate = useNavigate();
  const activeSpaceId = useActiveWorkspaceId();
  const { data, loading, error } = useGetContentModelsApi();
  const models = data?.getContentModels || [];

  const spaceModels = React.useMemo(() => {
    return models.filter((m) => {
      const modelWorkspaceId = m.workspaceId || 'project-1';
      return modelWorkspaceId === activeSpaceId;
    });
  }, [models, activeSpaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9FAFB]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">
        <Result
          status="error"
          title="Gagal memuat visualisasi"
          subTitle={error.message}
          extra={[
            <Button
              type="primary"
              key="back"
              onClick={() => navigate(getContentModelPath(activeSpaceId))}
            >
              Kembali ke Daftar
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Visual Modeler Header */}
      <div className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(getContentModelPath(activeSpaceId))}
            className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
          >
            <ArrowLeftOutlined />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <ApartmentOutlined className="text-[#2563EB] text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">
                Visual Modeler
              </h1>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Content Infrastructure
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            {spaceModels?.length || 0} Content Models
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <VisualModelerCanvas models={spaceModels} />
      </div>
    </div>
  );
};

export default VisualModelerPage;
