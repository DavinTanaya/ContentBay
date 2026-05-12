import { Card, Image } from 'antd';
import { HomeAssets } from '../../assets';

const problems = [
  {
    title: 'Expensive Development',
    description:
      'Hiring backend developers and maintaining infrastructure costs thousands monthly',
    icon: HomeAssets.icons.expensive,
    color: 'red',
  },
  {
    title: 'Repetitive Updates',
    description:
      'Content changes require developer intervention, slowing down your business',
    icon: HomeAssets.icons.repetitive,
    color: 'gold',
  },
  {
    title: 'Unstructured Data',
    description:
      'Without proper content modeling, data becomes messy and hard to manage',
    icon: HomeAssets.icons.unstructured,
    color: 'blue',
  },
];

export function ProblemStatementSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center flex flex-col gap-6 mb-20">
          <span className="caption-xl-semibold text-blue-6 uppercase block">
            The Problem
          </span>
          <h2 className="display-sm-semibold text-black m-0 leading-tight">
            Traditional Backend Development is Painful
          </h2>
          <p className="h6-regular text-slate-500 m-0 max-w-3xl mx-auto leading-relaxed">
            Building and maintaining backends takes time, money, and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              bordered={false}
              className="h-full rounded-4xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
              styles={{ body: { padding: '48px' } }}
            >
              <div className="flex flex-col gap-8">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
                    ${
                      problem.color === 'red'
                        ? 'bg-red-1'
                        : problem.color === 'gold'
                          ? 'bg-gold-1'
                          : 'bg-blue-1'
                    }`}
                >
                  <Image
                    src={problem.icon}
                    alt={problem.title}
                    preview={false}
                    height={32}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="h5-bold text-black m-0">{problem.title}</h3>
                  <p className="body-md-regular text-slate-500 m-0 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
