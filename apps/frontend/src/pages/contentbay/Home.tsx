import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import CTASection from '@/shared/components/layout/contentbay/CTASection';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/content-model');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-[#E6F0FF] via-[#F5F9FF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                Now in Public Beta
              </div>
              <h1 className="text-5xl md:text-[64px] font-bold text-slate-900 leading-[1.1] mb-6">
                Manage content <br />
                <span className="text-[#2563EB]">at scale</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                The headless CMS that gives developers the freedom to build and content managers the power to manage content across any platform. Build faster with a flexible API.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button type="primary" size="large" className="bg-[#2563EB] h-12 px-8 rounded-lg font-bold text-base shadow-lg shadow-blue-100">
                  Try for free
                </Button>
                <Button size="large" className="h-12 px-8 rounded-lg font-bold text-base border-gray-200">
                  View Demo
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-white/50 relative z-10 backdrop-blur-sm">
                <div className="flex items-center space-x-1.5 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 bg-blue-200/50 rounded w-1/3"></div>
                        <div className="h-2 bg-blue-100/50 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full blur-[80px] opacity-40 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-300 rounded-full blur-[80px] opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Traditional Backend Development is Painful</h2>
          <p className="text-slate-500 mb-16">Building and maintaining custom backends is slow, costly, and complex.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expensive Development", desc: "Heavy architectural costs and time-consuming infrastructure setup for every new project.", icon: "S", color: "bg-red-50 text-red-500" },
              { title: "Repetitive Updates", desc: "Tired of repetitive manual content updates that require developer intervention every single time.", icon: "🔄", color: "bg-yellow-50 text-yellow-500" },
              { title: "Unstructured Data", desc: "Dealing with inconsistent data formats across multiple platforms leads to maintenance hell.", icon: "📂", color: "bg-blue-50 text-blue-500" }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-white border border-gray-50 shadow-sm hover:shadow-md transition-all text-left">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-xl font-bold mb-8`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">The Solutions</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Centralized Content with API-First Architecture</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                ContentBay provides a powerful set of tools to create the backend of your content management needs. Under a centralized cloud storage layer, your content can be easily distributed via our flexible RESTful API.
              </p>
              <ul className="space-y-6">
                {[
                  { title: "Visual Content Modeling", desc: "Design your data structure with our intuitive drag-and-drop editor." },
                  { title: "Instant API Generation", desc: "Automatically generate a powerful GraphQL/REST API for your content." },
                  { title: "Omnichannel Delivery", desc: "Deliver content anywhere: web, mobile apps, IoT, and more." }
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                      <p className="text-slate-500 text-xs mt-1">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="Solution" 
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Build Faster */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background Overlay Image/Pattern */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to <span className="text-blue-600">build faster</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Powerful features designed for modern development workflows.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "API-First Architecture", desc: "Build with your favorite frameworks. Our RESTful and GraphQL APIs give you complete freedom.", icon: (
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
              )},
              { title: "Flexible Content Models", desc: "Create any content structure you need. No limitations, fully customizable.", icon: (
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>
                </div>
              )},
              { title: "Lightning Fast", desc: "Global CDN ensures your content is delivered instantly to users worldwide.", icon: (
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                </div>
              )},
              { title: "Multi-Channel Ready", desc: "Deliver content to web, mobile, IoT, or any platform from a single source.", icon: (
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
              )}
            ].map((feature, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-white flex flex-col items-start gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50 relative overflow-hidden group">
                {feature.icon}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                {/* Decorative corner shape from design */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DX Section */}
      <section className="py-32 bg-[#050B1A] text-white relative overflow-hidden">
        {/* Precise Radial Glow from Image */}
        <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-6 block">For Developers</span>
              <h2 className="text-5xl font-bold mb-6 leading-tight text-white">Built for Developer Experience</h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg max-w-lg">
                Integrate ContentBay into your application with just a few lines of code. Our APIs are designed to be intuitive, powerful, and fully documented.
              </p>
              <Button type="primary" size="large" className="bg-[#1D91FF] hover:bg-blue-500 h-14 px-10 rounded-xl font-bold border-none text-base shadow-lg shadow-blue-500/20">
                View Documentation
              </Button>
            </div>
            <div className="flex-1 w-full relative">
              {/* Outer border/glow from image */}
              <div className="bg-[#0D121F] rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center space-x-2.5 mb-10">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>
                <div className="space-y-5 font-mono">
                  <div className="h-2.5 bg-white/20 rounded-full w-1/3"></div>
                  <div className="ml-4 h-2.5 bg-white/20 rounded-full w-2/3"></div>
                  <div className="ml-8 h-2.5 bg-white/15 rounded-full w-1/2"></div>
                  <div className="ml-8 h-2.5 bg-white/15 rounded-full w-3/4"></div>
                  <div className="ml-4 h-2.5 bg-white/20 rounded-full w-4/5"></div>
                  <div className="pt-8 space-y-4">
                    <div className="h-2 bg-white/10 rounded-full w-full"></div>
                    <div className="h-2 bg-white/10 rounded-full w-5/6"></div>
                    <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                    <div className="h-2 bg-white/10 rounded-full w-2/3"></div>
                    <div className="h-2 bg-white/10 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Home;
