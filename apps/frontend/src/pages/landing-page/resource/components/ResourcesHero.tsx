import { Input } from 'antd';

export function ResourcesHero() {
  return (
    <section className="pt-24 pb-32 bg-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
          Resources
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
          Everything you need to <br />
          <span className="text-blue-600">get started</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
          Documentation, tutorials, and guides to help you build faster with
          ContentBay.
        </p>
        <div className="max-w-2xl mx-auto">
          <Input.Search
            placeholder="Search documentation, guides, and tutorials..."
            size="large"
            className="h-16 rounded-2xl overflow-hidden shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
