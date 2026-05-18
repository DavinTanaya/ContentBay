import { Layers, CircleCheck } from 'lucide-react';

export function ModelingSection() {
  const fields = [
    {
      label: 'Title',
      subtitle: 'Required field',
      type: 'Text',
      accent: 'border-l-blue-7',
    },
    {
      label: 'Description',
      subtitle: 'Markdown supported',
      type: 'Rich Text',
      accent: 'border-l-blue-5',
    },
    {
      label: 'Price',
      subtitle: 'Currency Format',
      type: 'Number',
      accent: 'border-l-green-6',
    },
    {
      label: 'Category',
      subtitle: 'Link to Category model',
      type: 'Reference',
      accent: 'border-l-yellow-6',
    },
    {
      label: 'Image',
      subtitle: 'Product thumbnail',
      type: 'Media',
      accent: 'border-l-red-6',
    },
  ];

  const items = [
    {
      title: 'Multiple Field Types',
      desc: 'Text, rich text, numbers, dates, media, references, and more.',
    },
    {
      title: 'Relationships',
      desc: 'Link content models together with one-to-one or one-to-many relationships.',
    },
    {
      title: 'Validation Rules',
      desc: 'Set required fields, min/max values, regex patterns, and custom validation.',
    },
  ];

  return (
    <section className="py-32 bg-gray-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-gray-1 rounded-[20px] border border-gray-6 shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="h5-semibold text-gray-13">
                  Content Model Example
                </p>
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center">
                <Layers className="text-blue-7" size={24} />
              </div>
            </div>

            <div className="space-y-4">
              {fields.map((field) => (
                <div
                  key={field.label}
                  className={`flex items-start justify-between gap-4 rounded-lg border-l-4 bg-geekblue-1 p-4 ${field.accent}`}
                >
                  <div className="grid gap-1">
                    <p className="body-md-semibold text-gray-13">
                      {field.label}
                    </p>
                    <p className="label-xs-regular text-gray-7">
                      {field.subtitle}
                    </p>
                  </div>
                  <span className="rounded bg-gray-1 px-3 py-1 text-[10px] font-regular text-gray-7 whitespace-nowrap">
                    {field.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="display-sm-semibold text-gray-13 mb-6 whitespace-nowrap">
              Flexible Content Modeling
            </h2>
            <p className="body-md-regular text-gray-13 max-w-xl mb-10">
              Design your content structure exactly how you want it. Create
              custom content types with various field types, validation rules,
              and relationships between models.
            </p>

            <ul className="space-y-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="shrink-0 flex items-center justify-center rounded-xl bg-geekblue-1 w-9 h-9">
                    <CircleCheck className="text-blue-7" size={20} />
                  </div>
                  <div>
                    <h4 className="h6-semibold text-gray-13 mb-1">
                      {item.title}
                    </h4>
                    <p className="body-md-regular text-gray-13">
                      {item.desc}
                    </p>
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
