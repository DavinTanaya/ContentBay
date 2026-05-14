import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentModelSettingsWidget } from '@/widgets/content-model-settings';
import { Button } from 'antd';
import { PATH } from '@/shared/constants/routes';

export default function ContentModelSettingsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <div className="px-12 pt-8">
        <Button
          type="text"
          className="text-black group"
          onClick={() => navigate(PATH.contentbay.contentModel)}
          icon={
            <ArrowLeftOutlined
              style={{ stroke: 'currentColor', strokeWidth: '25' }} // Trik agar icon terlihat lebih tebal
              className="group-hover:-translate-x-1 transition-transform"
            />
          }
        >
          Back To Content Model
        </Button>
      </div>
      <ContentModelSettingsWidget
        modelId={id || ''}
        onBack={() => navigate('/content-model')}
        onNavigateToBuilder={(id) => navigate(`/content-model/${id}`)}
      />
    </div>
  );
}
