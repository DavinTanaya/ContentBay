import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ContentModelBuilderWidget } from '@/widgets/content-model-builder';

export default function ContentModelBuilderPage() {
  const navigate = useNavigate();
  const { modelId } = useParams();

  return (
    <>
      <ContentModelBuilderWidget
        modelId={modelId || ''}
        onBack={() => navigate('/content-model')}
      />
    </>
  );
}
