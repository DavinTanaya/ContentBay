export function ModelingSection() {
  const items = [
    {
      title: 'Multiple Field Types',
      desc: 'Text, Rich Text, Images, Numbers, JSON, and more.',
    },
    {
      title: 'Relationships',
      desc: 'Link content types together with simple or complex relationships.',
    },
    {
      title: 'Validation Rules',
      desc: 'Ensure your data is always clean and consistent.',
    },
  ];

  return (
    <section className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-slate-900">Content Model Example</h4>
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                ⚙️
              </div>
            </div>
            <div className="space-y-4">
              {['Title', 'Description', 'Price', 'Category'].map((field) => (
                <div
                  key={field}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <span className="font-medium text-slate-700">{field}</span>
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                    {field === 'Price' ? 'Number' : 'String'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              Flexible Content Modeling
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Design your content structure without any limitations. Define
              fields, relationships, and validation rules in minutes.
            </p>
            <ul className="space-y-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
