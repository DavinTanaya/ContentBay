import { Input } from 'antd';
import { Search } from 'lucide-react';

export function ResourcesHero() {
  return (
    <section className="pt-24 pb-32 bg-[linear-gradient(135deg,_#FFFFFF_15%,_#E4EDFF_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-[#0061D1] font-semibold text-[20px] leading-[28px] mb-4 block font-['Poppins']">
          RESOURCES
        </span>
        <h1 className="text-[48px] leading-[52.8px] font-semibold text-slate-900 mb-6 tracking-tight">
          Everything you need to <br />
          <span className="text-[#0061D1]">get started</span>
        </h1>
        <p className="text-[18px] leading-[20px] text-slate-600 max-w-2xl mx-auto mb-10 font-normal">
          Documentation, tutorials, and guides to help you build faster
        </p>
        <div className="w-full max-w-[600px] mx-auto">
          <Input
            prefix={<Search color="#BFBFBF" size={20} className="mr-[20px]" />}
            placeholder="Search documentations, guides, and tutorials..."
            size="large"
            className="h-[60px] rounded-[16px] text-[16px] leading-[24px] font-normal border-[#C5CFE3] border-solid bg-white text-black placeholder:text-[#BFBFBF] hover:border-[#BFBFBF] focus:border-[#0061D1] font-['Poppins']"
            style={{ 
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              borderWidth: '1px',
              paddingLeft: '21px',
              paddingRight: '21px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
