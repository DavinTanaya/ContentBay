import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

export function SiteFooterSection() {
  return (
    <footer className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold text-slate-900 m-0">
              ContentBay
            </h3>
            <p className="max-w-xs text-lg text-slate-500 m-0 leading-relaxed">
              The modern headless CMS for teams that value speed, flexibility,
              and developer experience.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110">
              <TwitterOutlined className="text-2xl" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110">
              <GithubOutlined className="text-2xl" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-all hover:scale-110">
              <LinkedinOutlined className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="flex flex-col gap-8">
          <span className="font-bold text-slate-900 uppercase tracking-[0.2em] text-xs">Product</span>
          <nav className="flex flex-col gap-5">
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Features</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">API Reference</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Visual Editor</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Pricing</a>
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-bold text-slate-900 uppercase tracking-[0.2em] text-xs">Solutions</span>
          <nav className="flex flex-col gap-5">
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">E-commerce</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Marketing</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Mobile Apps</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Enterprise</a>
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <span className="font-bold text-slate-900 uppercase tracking-[0.2em] text-xs">Company</span>
          <nav className="flex flex-col gap-5">
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">About Us</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Careers</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Blog</a>
            <a className="text-lg text-slate-500 hover:text-blue-600 transition-colors no-underline" href="#">Contact</a>
          </nav>
        </div>
      </div>

      <Divider className="my-16 border-gray-100" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-slate-400 m-0 text-base">
          © 2024 ContentBay. All rights reserved.
        </p>
        <div className="flex gap-12">
          <a className="text-base text-slate-400 hover:text-blue-600 no-underline transition-colors" href="#">Privacy Policy</a>
          <a className="text-base text-slate-400 hover:text-blue-600 no-underline transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
