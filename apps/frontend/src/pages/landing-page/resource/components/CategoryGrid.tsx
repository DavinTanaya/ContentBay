import { Button } from 'antd';
import { Link } from 'react-router-dom';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Documentation',
      count: '150+ articles',
      desc: 'Complete API reference and guides for developers.',
      color: 'bg-blue-50',
      icon: '📄',
      link: '/documentation',
    },
    {
      title: 'Code Examples',
      count: '50+ examples',
      desc: 'Ready-to-use code snippets for common use cases.',
      color: 'bg-purple-50',
      icon: '💻',
      link: '#',
    },
    {
      title: 'Video Tutorials',
      count: '30+ videos',
      desc: 'Step-by-step video guides from our team and community.',
      color: 'bg-orange-50',
      icon: '📹',
      link: '#',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Explore by category
          </h2>
          <p className="text-slate-500 text-lg">
            Find the resources you need, organized by topic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.color} p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-start hover:shadow-xl transition-all`}
            >
              <div className="text-4xl mb-6">{cat.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {cat.title}
              </h3>
              <span className="text-blue-600 font-semibold mb-6 block">
                {cat.count}
              </span>
              <p className="text-slate-600 mb-10 flex-grow">{cat.desc}</p>
              <Link to={cat.link}>
                <Button
                  type="link"
                  className="p-0 font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  Explore {cat.title}{' '}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
