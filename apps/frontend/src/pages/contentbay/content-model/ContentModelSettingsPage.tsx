import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentModelSettingsWidget } from '@/widgets/content-model-settings';

export default function ContentModelSettingsPage() {
  const navigate = useNavigate();
  const { modelId } = useParams();

  return (
    <div>
      {/* Back Button */}
      <div className="px-12 pt-8">
        <button
          onClick={() => navigate('/content-model')}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors group"
        >
          <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{' '}
          Back to Content Models
        </button>
      </div>
      <ContentModelSettingsWidget
        modelId={modelId || ''}
        onBack={() => navigate('/content-model')}
        onNavigateToBuilder={(id) => navigate(`/content-model/${id}`)}
      />
    </div>
  );
}
