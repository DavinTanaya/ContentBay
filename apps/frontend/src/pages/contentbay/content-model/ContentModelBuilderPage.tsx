import { useNavigate, useParams } from 'react-router-dom';
import { ContentModelBuilderWidget } from '@/widgets/content-model-builder';

export default function ContentModelBuilderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <ContentModelBuilderWidget
        modelId={id || ''}
        onBack={() => navigate('/content-model')}
      />
    </>
  );
}
