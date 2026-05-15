import { Card } from 'antd';
import { DollarSignIcon, RefreshCw, ShieldQuestionMark } from 'lucide-react';

const problems = [
  {
    title: 'Expensive Development',
    description:
      'Hiring backend developers and maintaining infrastructure costs thousands monthly',
    icon: <DollarSignIcon className="text-red-7" size={30} />,
    color: 'red',
  },
  {
    title: 'Repetitive Updates',
    description:
      'Content changes require developer intervention, slowing down your business',
    icon: <RefreshCw className="text-yellow-6" size={30} />,
    color: 'yellow',
  },
  {
    title: 'Unstructured Data',
    description:
      'Without proper content modeling, data becomes messy and hard to manage',
    icon: <ShieldQuestionMark className="text-blue-7" size={32} />,
    color: 'blue',
  },
];

export function ProblemStatementSection() {
  return (
    <section className="bg-white py-20 px-14">
      <div className="max-w-full mx-auto">
        <div className="text-center flex flex-col mb-14">
          <span className="caption-xl-semibold text-blue-7 uppercase mb-1">
            The Problem
          </span>
          <h2 className="display-sm-semibold text-black mb-2">
            Traditional Backend Development is Painful
          </h2>
          <p className="label-md-regular text-gray-10">
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
                        : problem.color === 'yellow'
                          ? 'bg-yellow-1'
                          : 'bg-blue-1'
                    }`}
                >
                  {problem.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h5 className="h5-semibold text-gray-10">{problem.title}</h5>
                  <p className="body-md-regular ">{problem.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
