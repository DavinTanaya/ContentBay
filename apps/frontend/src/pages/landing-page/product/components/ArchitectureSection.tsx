export function ArchitectureSection() {
  const cards = [
    {
      title: 'Frontend Freedom',
      image:
        'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Omnichannel Ready',
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Future-Proof',
      image:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Headless CMS <span className="text-blue-600">Architecture</span>
          </h2>
          <p className="text-slate-500 text-lg">
            A stack that is built for performance and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {card.title}
              </h3>
              <p className="text-slate-500">
                Easily connect to any frontend framework of your choice.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
