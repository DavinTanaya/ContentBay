import {
  DatabaseOutlined,
  DollarOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Card, Image } from 'antd';
import { HomeAssets } from '../../assets';

const features = [
  {
    title: 'API-First Architecture',
    description:
      'Build with your favorite frameworks. Our RESTful and GraphQL APIs give you complete freedom.',
    icon: <DollarOutlined />,
  },
  {
    title: 'Flexible Content Models',
    description:
      'Create any content structure you need. No limitations, fully customizable.',
    icon: <DatabaseOutlined />,
  },
  {
    title: 'Lightning Fast',
    description:
      'Global CDN ensures your content is delivered instantly to users worldwide.',
    icon: <ThunderboltOutlined />,
  },
  {
    title: 'Multi-Channel Ready',
    description:
      'Deliver content to web, mobile, IoT, or any platform from a single source.',
    icon: <GlobalOutlined />,
  },
];

export function FeaturesGridSection() {
  return (
    <section className="relative w-full">
      {/* Background Header */}
      <div className="relative h-[500px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <img
          src={HomeAssets.images.features}
          alt="Features Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        
        <div className="relative z-20 flex flex-col gap-6">
          <h2 className="display-sm-semibold text-white m-0">
            Everything you need to <span className="text-blue-400">build faster</span>
          </h2>
          <p className="body-md-regular text-gray-300 m-0 max-w-2xl mx-auto opacity-80">
            Powerful features designed for modern development workflows
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-32 relative z-30 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              bordered={false}
              className="h-full rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden relative group"
              styles={{ body: { padding: '48px' } }}
            >
              {/* Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#3751A1] text-white text-3xl shadow-lg">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="h4-bold text-black m-0">{feature.title}</h3>
                  <p className="body-md-regular text-gray-500 m-0 leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
