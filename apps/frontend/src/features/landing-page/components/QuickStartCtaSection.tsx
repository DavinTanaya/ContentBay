import { Button } from 'antd';

export function QuickStartCtaSection() {
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
                className="h-14 px-10 rounded-xl text-lg font-bold text-white bg-[#60A5FA] border-none shadow-lg shadow-blue-500/20 hover:!bg-[#3B82F6] transition-all"
              >
                Get Started Free
              </Button>
              <Button
                size="large"
                className="h-14 px-10 rounded-xl text-lg font-bold text-slate-800 bg-white border border-gray-200 hover:!border-blue-500 hover:!text-blue-600 transition-all"
              >
                Contact Sales
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="/landing-page/shared/cta.png"
              alt="Start building with ContentBay"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
