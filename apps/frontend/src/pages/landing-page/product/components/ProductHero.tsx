import { Button } from 'antd';

export function ProductHero() {
  return (
    <section className="pt-24 pb-32 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
          Product Overview
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
          The complete content platform
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
          A modern headless CMS that gives you absolute control over your
          content, allowing you to deliver it to any platform without the
          complexity of managing your own server.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 h-14 px-10 rounded-xl font-bold text-lg"
          >
            Start for free
          </Button>
          <Button
            size="large"
            className="h-14 px-10 rounded-xl font-bold text-lg"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
