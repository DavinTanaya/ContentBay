import { Button } from 'antd';
import ctaImg from '@/shared/assets/landing-page/cta.png';

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto overflow-hidden rounded-[2.5rem] bg-geekblue-1 p-12 md:p-20 border border-geekblue-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 text-left">
              <h2 className="display-sm-semibold text-slate-900 m-0 leading-tight">
                Start building your backend in minutes
              </h2>
              <p className="h6-regular text-slate-600 m-0 leading-relaxed max-w-xl">
                Join thousands of teams already using ContentBay
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Button
                size="large"
                type='primary'
              >
                Get Started Free
              </Button>
              <Button
                size="large"
                type='default'
              >
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={ctaImg}
              alt="Start building with ContentBay"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
