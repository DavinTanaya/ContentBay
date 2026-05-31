import { Button } from 'antd';
import ctaImg from '../assets/cta.png';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/constants/routes';

export function CTA() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6">
      <div className="max-w-300 mx-auto overflow-hidden rounded-[2.5rem] bg-geekblue-1 p-12 md:p-20 border border-geekblue-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1 text-left">
              <h2 className="display-sm-semibold text-grey-13">
                Start building your backend in minutes
              </h2>
              <p className="label-md-regular text-gray-9 max-w-xl">
                Join thousands of teams already using ContentBay
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Button
                size="medium"
                type="primary"
                onClick={() => navigate(PATH.auth.register)}
              >
                Get Started Free
              </Button>
              <Button size="medium" type="default">
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={ctaImg}
              alt="Start building with ContentBay"
              className="w-full max-w-125 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
