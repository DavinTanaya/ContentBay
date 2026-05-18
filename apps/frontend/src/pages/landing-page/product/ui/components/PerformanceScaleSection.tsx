import { Zap, Globe, Shield, Database, Lock,  RefreshCw, GitBranch } from 'lucide-react';

export function PerformanceScaleSection() {
  const stats = [
    {
      val: '10ms',
      label: 'Avg API Response',
      icon: <Zap size={36} className="text-gray-1" />,
    },
    {
      val: '200+',
      label: 'CDN Locations',
      icon: <Globe size={36} className="text-gray-1" />,
    },
    {
      val: '99.9%',
      label: 'Uptime SLA',
      icon: <Shield size={36} className="text-gray-1" />,
    },
    {
      val: '500M+',
      label: 'API calls/month',
      icon: <Database size={36} className="text-gray-1" />,
    },
  ];

  const features = [
    {
      title: 'Enterprise Security',
      desc: 'SOC 2 Type II certified with SSO, 2FA, and role-based access control',
      tags: ['SSO', '2FA', 'RBAC'],
      icon: <Lock size={32} className="text-blue-3" />,
    },
    {
      title: 'Auto Scaling',
      desc: 'Infrastructure that automatically scales to handle traffic spikes',
      tags: ['Load Balancing', 'Auto-Scale'],
      icon: <RefreshCw size={32} className="text-blue-3" />,
    },
    {
      title: 'Version Control',
      desc: 'Full content versioning with instant rollback capabilities',
      tags: ['Versioning', 'Rollback'],
      icon: <GitBranch size={32} className="text-blue-3" />,
    },
  ];

  return (
    <section
      className="py-32 text-white relative overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, #0F172A 15%, #003A8C 50%, #0F172A 85%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="display-lg-semibold text-gray-1 mb-6 leading-tight">
            Built for performance & scale
          </h2>
          <p className="text-gray-1 body-md-regular max-w-2xl mx-auto">
            Enterprise-grade infrastructure that grows with your business
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FAAD14, #D46B08)',
                }}
              >
                {stat.icon}
              </div>
              <div className="h1-semibold text-gray-1 mb-2">
                {stat.val}
              </div>
              <div className="h6-semibold text-geekblue-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#ADC6FF]/25 backdrop-blur-md rounded-[20px] p-10 border border-[#ADC6FF] hover:bg-white/10 transition-all"
            >
              <div className="mb-8">{feature.icon}</div>
              <h3 className="h5-semibold mb-4 text-gray-1">
                {feature.title}
              </h3>
              <p className="text-gray-1 mb-8 leading-relaxed body-sm-regular">
                {feature.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-[20px] bg-[#ADC6FF]/50 text-gray-1 footnote-description tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
