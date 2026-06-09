import { Link, useNavigate } from 'react-router-dom';
import { Button, Image } from 'antd';
import { PATH } from '@/shared/constants/routes';
import { sharedAssets } from '@/shared/assets';

export function NavbarLanding() {
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b-gray-3">
      <div className="max-w-full mx-14">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to={PATH.landing.home}
              className="flex items-center space-x-2"
            >
              <Image
                src={sharedAssets.logo}
                alt="ContentBay Logo"
                className="h-8 w-8"
                preview={false}
              />
              <span className="h6-bold text-black">ContentBay</span>
            </Link>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center label-xs-medium font-poppins text-black">
            <Button
              size="small"
              type="text"
              onClick={() => navigate(PATH.landing.product)}
            >
              Product
            </Button>
            <Button
              size="small"
              type="text"
              onClick={() => navigate(PATH.landing.resource)}
            >
              Resources
            </Button>
            <Button
              size="small"
              type="text"
              onClick={() => navigate(PATH.landing.documentation)}
            >
              Documentation
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="text"
              size="small"
              onClick={() => navigate(PATH.auth.login)}
            >
              Login
            </Button>

            <Button
              variant="solid"
              size="small"
              color="geekblue"
              onClick={() => navigate(PATH.auth.register)}
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
