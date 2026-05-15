import { Button, Image } from 'antd';
import { HomeAssets } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/constants/routes';
import { sharedUi } from '@/shared/ui';

export function HomeHeroSection() {
  const navigate = useNavigate();
  return (
    <sharedUi.landingHero>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col">
          <div className="w-fit mb-3 px-4 py-1.5 rounded-full bg-[#2463EB]/10 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-6" />
            <span className="caption-md-semibold text-blue-6 uppercase">
              new: visual editor 2.0
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-1">
            <h1 className="display-lg-semibold text-black">Manage content</h1>
            <h1 className="display-lg-semibold text-blue-6">at scale</h1>
          </div>
          <p className="max-w-xl body-md-regular text-gray-10">
            The headless CMS that gives developers the freedom to build and
            creators the power to manage content across any platform. Build
            faster with a flexible API.
          </p>
          <div className="flex flex-wrap gap-5 mt-8">
            <Button
              size="medium"
              variant="solid"
              color="geekblue"
              onClick={() => navigate(PATH.auth.register)}
            >
              Start Building for Free
            </Button>
            <Button size="medium" type="default">
              Book a Demo
            </Button>
          </div>
        </div>
        <div className="relative group w-full flex justify-center">
          <div className="absolute -inset-10 bg-blue-200/30 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <div className="relative">
            <Image
              preview={false}
              src={HomeAssets.images.hero}
              alt="ContentBay Dashboard Preview"
              className="w-full relative z-10"
            />
          </div>
        </div>
      </div>
    </sharedUi.landingHero>
  );
}
