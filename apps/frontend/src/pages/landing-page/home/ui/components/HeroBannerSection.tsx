import { Button, Image } from 'antd';
import { HomeAssets } from '../../assets';

export function HeroBannerSection() {
  return (
    <section className="w-full min-h-[85vh] flex items-center bg-linear-to-r from-white to-[#E4EDFF] py-20">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-10">
          {/* Tag */}
          <div className="w-fit px-4 py-1.5 rounded-full bg-[#2463EB]/10 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-6" />
            <span className="text-[11px] font-bold tracking-wider text-blue-6 uppercase">
              NEW: VISUAL EDITOR 2.0
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="display-lg text-black m-0 leading-[1.1]">
              Manage content
            </h1>
            <h1 className="display-lg text-blue-7 m-0 leading-[1.1]">
              at scale
            </h1>
          </div>
          <p className="max-w-xl h6-regular leading-relaxed text-slate-500 m-0">
            The headless CMS that gives developers the freedom to build and
            creators the power to manage content across any platform. Build
            faster with a flexible API.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-5 mt-4">
            <Button
              type="primary"
              size="large"
              className="h-14 px-10 rounded-xl text-lg font-bold bg-blue-600 hover:!bg-blue-700 border-none shadow-xl shadow-blue-200/50"
            >
              Start building for free
            </Button>
            <Button
              size="large"
              className="h-14 px-10 rounded-xl text-lg font-bold text-slate-700 border-slate-200 hover:!border-blue-500 hover:!text-blue-600 bg-white/80 backdrop-blur-sm"
            >
              Book a demo
            </Button>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative group w-full flex justify-center">
          <div className="absolute -inset-10 bg-blue-200/30 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <div className="relative transition-transform duration-500 group-hover:scale-[1.02]">
            <Image
              preview={false}
              src={HomeAssets.images.hero}
              alt="ContentBay Dashboard Preview"
              className="w-full relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
