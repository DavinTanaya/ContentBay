import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentModelCreateForm } from '@/features/create-content-model';

export default function ContentModelCreatePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button */}
      <div className="bg-[#F9FAFB] px-12 pt-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/content-model')}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{' '}
            Back to Content Models
          </button>
        </div>
      </div>
      <ContentModelCreateForm
        onBack={() => navigate('/content-model')}
        onSuccess={() => navigate('/content-model')}
      />
    </>
  );
}
