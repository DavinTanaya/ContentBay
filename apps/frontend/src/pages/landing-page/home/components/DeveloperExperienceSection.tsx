import { Button } from 'antd';

export function DeveloperExperienceSection() {
  return (
    <section className="bg-[#0B0F19] py-32 px-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] z-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] z-0" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Text Content */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="caption-xl-semibold text-blue-5 uppercase block">
              For Developers
            </span>
            <h2 className="display-sm-semibold text-white m-0 leading-tight">
              Built for Developer Experience
            </h2>
            <p className="body-md-regular text-gray-400 m-0 leading-relaxed max-w-xl">
              Integrate ContentBay into your application with just a few lines
              of code. Our APIs are designed to be intuitive, powerful, and
              fully documented.
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            className="h-14 w-fit px-10 rounded-xl text-lg font-bold bg-[#60A5FA] border-none hover:!bg-[#3B82F6] transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            View Documentation
          </Button>
        </div>

        {/* Image Content */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img
            src="/landing-page/home/built.png"
            alt="Developer experience"
            className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/5"
          />
        </div>
      </div>
    </section>
  );
}
