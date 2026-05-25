import { Input } from 'antd';
import { Search } from 'lucide-react';

export function ResourcesHero() {
  return (
    <section className="w-full flex items-center py-20 bg-[linear-gradient(150deg,#FFFFFF_0%,#FFFFFF_20%,#E4EDFF_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <span className="text-blue-7 mb-4 caption-xl-semibold">
          RESOURCES
        </span>
        <h1 className="mb-6 display-sm-semibold">
          Everything you need to <br />
          <span className="text-blue-7">get started</span>
        </h1>
        <p className="text-gray-9 mb-8 label-md-regular">
          Documentation, tutorials, and guides to help you build faster
        </p>
        <div className="w-full max-w-[600px] mx-auto">
          <Input
            prefix={<Search size={20} className="text-gray-6 mr-[20px] h5-regular" />}
            placeholder="Search documentations, guides, and tutorials..."
            size="large"
            className="h-[60px] rounded-[16px] leading-[24px] border-geekblue-2 border-solid bg-gray-1 text-gray-13 placeholder:text-gray-6 hover:border-[text-gray-6] focus:border-[text-geekblue-2] h5-regular"
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
