import { Button, Image } from 'antd';
import { HomeAssets } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/constants/routes';

export function DeveloperExperienceSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#0F172A] py-20 overflow-hidden relative">
      <div className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] z-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[100px] z-0" />
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="caption-xl-semibold text-blue-6 uppercase mb-1">
              For Developers
            </span>
            <h2 className="display-sm-semibold text-white m-0 leading-tight mb-2">
              Built for Developer Experience
            </h2>
            <p className="body-md-regular text-geekblue-2 max-w-xl">
              Integrate ContentBay into your application with just a few lines
              of code. Our APIs are designed to be intuitive, powerful, and
              fully documented.
            </p>
          </div>
          <Button
            type="primary"
            size="medium"
            className="w-fit"
            onClick={() => navigate(PATH.landing.documentation)}
          >
            View Documentation
          </Button>
        </div>
        <div className="relative group">
          <Image
            src={HomeAssets.images.built}
            alt="Developer experience"
            className="relative z-10 w-full"
            preview={false}
          />
        </div>
      </div>
    </section>
  );
}
