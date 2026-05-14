import { Link } from 'react-router-dom';
import { Book, Code, Video, MoveRight } from 'lucide-react';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Documentation',
      count: '150+ articles',
      countColor: 'text-[#096DD9]',
      desc: 'Complete API reference and guides',
      bgColor: 'bg-[#D6E4FF]/50',
      strokeColor: 'border-[#597EF7]',
      iconColor: '#096DD9',
      bulletColor: 'bg-[#096DD9]',
      Icon: Book,
      link: '/documentation',
      items: [
        'API Reference',
        'Content Modeling',
        'Authentication',
        'Webhooks & Events',
      ],
    },
    {
      title: 'Code Examples',
      count: '50+ examples',
      countColor: 'text-[#9254DE]',
      desc: 'Ready-to-use code snippets',
      bgColor: 'bg-[#EFDBFF]/50',
      strokeColor: 'border-[#9254DE]',
      iconColor: '#9254DE',
      bulletColor: 'bg-[#9254DE]',
      Icon: Code,
      link: '#',
      items: [
        'React Integration',
        'Vue.js Examples',
        'Node.js Backend',
        'GraphQL Queries',
      ],
    },
    {
      title: 'Video Tutorials',
      count: '30+ videos',
      countColor: 'text-[#A8071A]',
      desc: 'Learn by watching',
      bgColor: 'bg-[#FFCCC7]/50',
      strokeColor: 'border-[#FF7875]',
      iconColor: '#A8071A',
      bulletColor: 'bg-[#A8071A]',
      Icon: Video,
      link: '#',
      items: [
        'Quick Start',
        'Advanced Features',
        'Best Practices',
        'Case Studies',
      ],
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-semibold text-slate-900 mb-2 leading-tight">
            Explore by category
          </h2>
          <p className="text-slate-500 text-lg">
            Find the resources you need, organized by topic
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-16">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.bgColor} ${cat.strokeColor} w-[360px] h-[480px] px-[52px] py-[49px] rounded-[20px] border-[1px] flex flex-col items-start transition-all hover:shadow-lg`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-white rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] flex items-center justify-center mb-8">
                <cat.Icon size={24} color={cat.iconColor} />
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                {cat.title}
              </h3>
              <span className={`${cat.countColor} text-sm font-semibold mb-6 block`}>
                {cat.count}
              </span>
              
              <p className="text-slate-500 text-sm mb-5">
                {cat.desc}
              </p>

              {/* List Items */}
              <ul className="space-y-3 mb-auto">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${cat.bulletColor}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Explore Link */}
              <Link
                to={cat.link}
                className={`mt-8 flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80`}
                style={{ color: cat.iconColor }}
              >
                Explore <MoveRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
