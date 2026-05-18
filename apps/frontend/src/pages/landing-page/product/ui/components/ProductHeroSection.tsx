import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/constants/routes';
import { sharedUi } from '@/shared/ui';

export function ProductHero() {
  const navigate = useNavigate();
  return (
    <sharedUi.landingHero>
      <div className="w-full max-w-[1440px] min-h-[400px] mx-auto px-6 flex flex-col items-center justify-center text-center">
        <span className="caption-xl-semibold text-blue-7 uppercase mb-4 block">
          Product Overview
        </span>
        <h1 className="display-sm-semibold text-gray-13 mb-4">
          The complete content platform
        </h1>
        <p className="body-md-regular text-gray-10 max-w-3xl mx-auto mb-4">
          A modern headless CMS that gives you complete control over your
          content infrastructure without the complexity of building and
          maintaining a backend.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
              size="medium"
              variant="solid"
              color="geekblue"
              onClick={() => navigate(PATH.auth.register)}
            >
            Start Free Trial
          </Button>
          <Button size="medium" type="default">
            Scheduled Demo
          </Button>
        </div>
      </div>
    </sharedUi.landingHero>
  );
}
