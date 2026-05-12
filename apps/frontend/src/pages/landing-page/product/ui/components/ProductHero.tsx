import { Button } from 'antd';

export function ProductHero() {
  return (
    <section
      className="w-full h-[540px] pt-[100px] pr-[24px] pb-[100px] pl-[24px] flex items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 20%, #E4EDFF 100%)',
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="caption-xl-semibold text-[var(--color-blue-7)] uppercase mb-4 block">
          Product Overview
        </span>
        <h1 className="display-sm-semibold text-[var(--color-gray-13)] mb-4">
          The complete content platform
        </h1>
        <p className="body-md-regular text-[var(--color-gray-10)] max-w-3xl mx-auto mb-4">
          A modern headless CMS that gives you complete control over your
          content infrastructure without the complexity of building and
          maintaining a backend.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            size="large"
            className="bg-[var(--color-blue-6)] h-14 px-10 rounded-xl font-bold text-lg"
          >
            Start Free Trial
          </Button>
          <Button
            size="large"
            className="h-14 px-10 rounded-xl font-bold text-lg"
          >
            Scheduled Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
