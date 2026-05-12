import React from 'react';
import { Button } from 'antd';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 bg-blue-50 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Start building your backend in minutes
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Join thousands of teams already using ContentBay to manage their content and scale their digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl font-semibold text-lg shadow-lg shadow-blue-200">
              Get Started Free
            </Button>
            <Button size="large" className="h-14 px-8 rounded-xl font-semibold text-lg border-gray-200 hover:border-blue-600 hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
        
        <div className="mt-12 md:mt-0 relative z-10 w-full max-w-md">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-100 border border-blue-50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Developer First</h4>
                <p className="text-sm text-slate-500">API-ready in seconds</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-2 bg-slate-100 rounded-full w-full"></div>
              <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
              <div className="h-2 bg-slate-100 rounded-full w-4/6"></div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=200&auto=format&fit=crop" 
                alt="Developer" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      </div>
    </section>
  );
};

export default CTASection;
