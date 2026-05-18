import { ProductAssets } from '../../assets';
import { Image } from 'antd';

const cards = [
    {
      title: 'Frontend Freedom',
      image: ProductAssets.images.frontend,
      subtitle: 'Use any framework: React, Vue, Angular, or mobile platforms',
    },
    {
      title: 'Omnichannel Ready',
      image: ProductAssets.images.omnichannel,
      subtitle: 'Deliver the same content across all channels and platforms',
    },
    {
      title: 'Future-Proof',
      image: ProductAssets.images.future,
      subtitle:
        'Switch frontends without migrating your entire content infrastructure',
    },
  ];

export function ArchitectureSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-20">
          <h2 className="display-sm-semibold text-gray-13 mb-4">
            Headless CMS{' '}
            <span className="text-blue-7 ">Architecture</span>
          </h2>
          <p className="body-md-regular text-gray-10 text-left">
            ContentBay is headless meaning your backend is completely separated
            from your presentation layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="w-full max-w-[380px] overflow-hidden rounded-2xl mb-6 shadow-lg">
                <Image
                  preview={false}
                  width="100%"
                  wrapperStyle={{ width: '100%', display: 'block' }}
                  src={card.image}
                  alt={`${card.title} illustrative image`}
                  className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="h4-semibold text-gray-13 mb-4">
                {card.title}
              </h3>
              <p className="body-md-regular text-gray-10">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
