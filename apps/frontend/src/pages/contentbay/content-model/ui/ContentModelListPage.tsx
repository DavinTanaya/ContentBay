import { useNavigate } from 'react-router-dom';
import { ContentModelList } from '@/widgets/content-model-list';
import { getContentModelSettings } from '@/shared/constants/routes';
import { Input, Button } from 'antd';
import { ApartmentOutlined, PlusOutlined } from '@ant-design/icons';

export default function ContentModelListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <h1 className="h3-semibold text-black">Content Model</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input.Search placeholder="Search..." allowClear />
          <Button
            size="middle"
            type="default"
            onClick={() => navigate('/content-model/visual')}
            icon={<ApartmentOutlined />}
          >
            Schema Modeler
          </Button>
          <Button
            variant="solid"
            color="geekblue"
            size="middle"
            onClick={() => navigate('/content-model/create')}
            icon={<PlusOutlined />}
          >
            Create Content Model
          </Button>
        </div>
      </div>

      <ContentModelList
        onNavigateToSettings={(id) => navigate(getContentModelSettings(id))}
      />
    </div>
  );
}
