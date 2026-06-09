import { Link } from 'react-router-dom';
import { Book, Code, Video, MoveRight } from 'lucide-react';
import { colors } from '@/shared/constants/colors';
import { PATH } from '@/shared/constants/routes';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Documentation',
      count: '150+ articles',
      countColor: 'text-blue-7',
      desc: 'Complete API reference and guides',
      bgColor: 'bg-geekblue-2/50',
      strokeColor: 'border-geekblue-5',
      iconColor: colors.blue[7],
      bulletColor: 'bg-blue-7',
      Icon: Book,
      link: PATH.landing.documentation,
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
      countColor: 'text-purple-5',
      desc: 'Ready-to-use code snippets',
      bgColor: 'bg-purple-2/50',
      strokeColor: 'border-purple-5',
      iconColor: colors.purple[5],
      bulletColor: 'bg-purple-5',
      Icon: Code,
      link: PATH.landing.documentation,
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
      countColor: 'text-red-8',
      desc: 'Learn by watching',
      bgColor: 'bg-red-2/50',
      strokeColor: 'border-red-4',
      iconColor: colors.red[8],
      bulletColor: 'bg-red-8',
      Icon: Video,
      link: PATH.landing.documentation,
      items: [
        'Quick Start',
        'Advanced Features',
        'Best Practices',
        'Case Studies',
      ],
    },
  ];

  return (
    <section className="py-24 bg-gray-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-13 mb-2 display-sm-semibold">
            Explore by category
          </h2>
          <p className="text-gray-9 body-md-regular">
            Find the resources you need, organized by topic
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-16">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.bgColor} ${cat.strokeColor} w-[360px] h-[480px] px-[52px] py-[49px] rounded-[20px] border flex flex-col items-start transition-all hover:shadow-lg`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-gray-1 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] flex items-center justify-center mb-5">
                <cat.Icon size={24} color={cat.iconColor} />
              </div>

              <h3 className="text-gray-13 mb-1 h6-semibold">
                {cat.title}
              </h3>
              <span className={`${cat.countColor} mb-6 body-sm-regular`}>
                {cat.count}
              </span>
              
              <p className="text-gray-9 mb-3 body-sm-regular">
                {cat.desc}
              </p>

              {/* List Items */}
              <ul className="space-y-4 mb-auto">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-gray-9 flex items-center gap-3 label-xs-regular">
                    <div className={`w-1.5 h-1.5 rounded-full ${cat.bulletColor}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Explore Link */}
              <Link
                to={cat.link}
                className={`mt-2 flex items-center gap-2 transition-opacity hover:opacity-80 label-sm-regular`}
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