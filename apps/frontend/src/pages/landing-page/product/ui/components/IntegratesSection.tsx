import { ProductAssets } from '../../assets';
import { Code, Zap, Database, GitMerge } from 'lucide-react';

const integrates = [
  {
    title: 'Frameworks',
    subtitle: 'Next.js, React, Vue, Angular',
    icon: <Code size={32} className="text-gray-1" />,
  },
  {
    title: 'Build Tools',
    subtitle: 'Webpack, Vite, Vercel, Netlify',
    icon: <Zap size={32} className="text-gray-1" />,
  },
  {
    title: 'Analytics',
    subtitle: 'Google Analytics, Mixpanel',
    icon: <Database size={32} className="text-gray-1" />,
  },
  {
    title: 'Automation',
    subtitle: 'Zapier, Make, webhooks',
    icon: <GitMerge size={32} className="text-gray-1" />,
  },
];

export function IntegratesSection() {
  return (
    <section className="bg-gray-1 pt-4">
      <div 
        className="relative pt-32 pb-48 bg-cover bg-bottom"
        style={{ backgroundImage: `url(${ProductAssets.images.integrates})` }}
      >
        <div className="absolute inset-0 bg-[#0E1D3E]/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="display-sm-semibold text-gray-1 mb-4">
            Integrates with your <span className="text-blue-6">stack</span>
          </h2>
          <p className="h5-semibold text-[#C5CFE3]">
            Connect with the tools you already use
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrates.map((item, idx) => (
            <div key={idx} className="bg-gray-1 rounded-[20px] p-8  border border-[#C5CFE3] flex flex-col items-center text-center">
              <div 
                className="w-16 h-16 rounded-[12px] flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(90deg, #2463EB 0%, #143885 100%)' }}
              >
                {item.icon}
              </div>
              <h3 className="h6-bold text-gray-13 mb-1">
                {item.title}
              </h3>
              <p className="body-sm-regular text-gray-9">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
