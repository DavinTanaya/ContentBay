export function ArchitectureSection() {
  const cards = [
    {
      title: 'Frontend Freedom',
      image: '/landing-page/product/frontend.jpg',
      subtitle: 'Use any framework: React, Vue, Angular, or mobile platforms',
    },
    {
      title: 'Omnichannel Ready',
      image: '/landing-page/product/omnichannel.jpg',
      subtitle: 'Deliver the same content across all channels and platforms',
    },
    {
      title: 'Future-Proof',
      image: '/landing-page/product/future.jpg',
      subtitle:
        'Switch frontends without migrating your entire content infrastructure',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-20">
          <h2 className="display-sm-semibold text-[var(--color-gray-13)]  mb-4">
            Headless CMS{' '}
            <span className="text-[var(--color-blue-7)] ">Architecture</span>
          </h2>
          <p className="body-md-regular text-[var(--color-gray-10)] text-left">
            ContentBay is headless meaning your backend is completely separated
            from your presentation layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg">
                <img
                  src={card.image}
                  alt={`${card.title} illustrative image`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="h4-semibold text-[var(--color-gray-13)] mb-4">
                {card.title}
              </h3>
              <p className="body-md-regular text-[var(--color-gray-10)]">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
