import React from 'react';
import { Button } from 'antd';
import CTASection from '@/shared/components/layout/contentbay/CTASection';

const Product: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Product Hero */}
      <section className="pt-24 pb-32 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Product Overview</span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">The complete content platform</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            A modern headless CMS that gives you absolute control over your content, allowing you to deliver it to any platform without the complexity of managing your own server.
          </p>
          <div className="flex justify-center space-x-4">
            <Button type="primary" size="large" className="bg-blue-600 h-14 px-10 rounded-xl font-bold text-lg">
              Start for free
            </Button>
            <Button size="large" className="h-14 px-10 rounded-xl font-bold text-lg">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Headless CMS <span className="text-blue-600">Architecture</span></h2>
            <p className="text-slate-500 text-lg">A stack that is built for performance and scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Frontend Freedom", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop" },
              { title: "Omnichannel Ready", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop" },
              { title: "Future-Proof", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop" }
            ].map((card, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img src={card.image} alt={card.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-500">Easily connect to any frontend framework of your choice.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Modeling */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-bold text-slate-900">Content Model Example</h4>
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600">⚙️</div>
              </div>
              <div className="space-y-4">
                {['Title', 'Description', 'Price', 'Category'].map((field) => (
                  <div key={field} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-medium text-slate-700">{field}</span>
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">{field === 'Price' ? 'Number' : 'String'}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Flexible Content Modeling</h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Design your content structure without any limitations. Define fields, relationships, and validation rules in minutes.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Multiple Field Types", desc: "Text, Rich Text, Images, Numbers, JSON, and more." },
                  { title: "Relationships", desc: "Link content types together with simple or complex relationships." },
                  { title: "Validation Rules", desc: "Ensure your data is always clean and consistent." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Scale Section */}
      <section 
        className="py-32 text-white relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(circle at center, #0B2268 0%, #051139 40%, #02081A 100%)' 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[56px] font-bold text-white mb-6 leading-tight">Built for performance & scale</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade infrastructure that grows with your business
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            {[
              { val: "10ms", label: "Avg API Response", icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              )},
              { val: "200+", label: "CDN Locations", icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
              )},
              { val: "99.9%", label: "Uptime SLA", icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              )},
              { val: "500M+", label: "API calls/month", icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
              )}
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div 
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20"
                  style={{ backgroundImage: 'linear-gradient(135deg, #FF8A00, #FFC700)' }}
                >
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Enterprise Security", 
                desc: "SOC 2 Type II certified with SSO, 2FA, and role-based access control",
                tags: ["SSO", "2FA", "RBAC"],
                icon: (
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                )
              },
              { 
                title: "Auto Scaling", 
                desc: "Infrastructure that automatically scales to handle traffic spikes",
                tags: ["Load Balancing", "Auto-Scale"],
                icon: (
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                )
              },
              { 
                title: "Version Control", 
                desc: "Full content versioning with instant rollback capabilities",
                tags: ["Versioning", "Rollback"],
                icon: (
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                )
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-[2rem] p-10 border border-white/10 hover:bg-white/10 transition-all">
                <div className="mb-8">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                  {feature.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Product;
