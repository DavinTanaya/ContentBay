import { CheckCircleOutlined } from '@ant-design/icons';
import { HomeAssets } from '../../assets';

const features = [
  {
    title: 'Visual Content Modelling',
    description: 'Design your data structure with our intuitive visual editor',
  },
  {
    title: 'Instant API Generation',
    description: 'Automatic REST & GraphQL APIs generated for all your content',
  },
  {
    title: 'Omnichannel Delivery',
    description: 'Use the same content across web, mobile, IoT, and more',
  },
];

export function SolutionOverviewSection() {
  return (
    <section className="bg-gray-4 py-32 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="caption-xl-semibold text-blue-6 uppercase block">
              The Solutions
            </span>
            <h2 className="display-sm-semibold text-black m-0 leading-tight">
              Centralized Content with API-First Architecture
            </h2>
            <p className="body-md-regular text-slate-500 m-0 leading-relaxed max-w-xl">
              ContentBay provides a powerful backend-as-a-service that handles
              all your content management needs. Create custom content models,
              manage your data through an intuitive interface, and deliver it
              anywhere via REST or GraphQL APIs.
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-1 border border-blue-2">
                  <CheckCircleOutlined className="text-lg text-blue-9" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="h6-bold text-black m-0">{feature.title}</h4>
                  <p className="body-sm-regular text-slate-500 m-0 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <img
            src={HomeAssets.images.solutions}
            alt="Centralized content"
            className="w-full rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
