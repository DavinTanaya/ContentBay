import { Button } from 'antd';
import { ResourceAssets } from '../../assets';
import { sharedUi } from '@/shared/ui';
import { colors } from '@/shared/constants/colors';

export function CommunitySection() {
  return (
    <section className="py-24 bg-gray-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div
              className="text-gray-1 text-sm inline-flex items-center px-3 py-1.5 rounded-full mb-6 label-xxs-bold"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #0050b3 0%, #096dd9 100%)',
              }}
            >
              Community
            </div>
            <h2 className="text-gray-13 mb-6 display-sm-semibold"> 
              Join our{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${colors.blue[8]} 0%, ${colors.blue[7]} 100%)`,
                }}
              >
                developer community
              </span>
            </h2>
            <p className="text-gray-8 mb-6 max-w-lg leading-relaxed h6-regular">
              Connect with 10.000+ developers, share knowledge, and get help
              from the community
            </p>

            <div className="space-y-6 max-w-[545px]">
              <Button
                shape="round"
                className="border-none text-gray-1 flex items-center justify-between gap-8 hover:opacity-90 transition-opacity shadow-xl group"
                style={{
                  backgroundImage:
                    `linear-gradient(90deg, #002766 0%, #0050b3 100%)`,
                  width: '545px',
                  height: '71px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: '34.5px',
                  paddingRight: '34.5px',
                  paddingTop: '20.5px',
                  paddingBottom: '20.5px',
                }}
              >
                <div className="flex items-center gap-8">
                  <sharedUi.icon.github className="text-gray-1 w-10 h-10" />
                  <span className="text-gray-1 h6-medium">
                    View Github Discussions
                  </span>
                </div>
                <svg
                  className="text-gray-1 w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>

              <Button
                shape="round"
                className="border-none text-gray-1 flex items-center justify-between gap-8 hover:opacity-90 transition-opacity shadow-xl group"
                style={{
                  backgroundImage:
                    `linear-gradient(90deg, #2f54eb 0%, #597ef7 100%)`,
                  width: '545px',
                  height: '71px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: '34.5px',
                  paddingRight: '34.5px',
                }}
              >
                <div className="flex items-center gap-8">
                  <sharedUi.icon.discord className="text-gray-1 w-10 h-10" />
                  <span className="text-gray-1 h6-medium">
                    Join Discord Server
                  </span>
                </div>
                <svg
                  className="text-gray-1 w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img
              src={ResourceAssets.images.community}
              alt="Community Collaboration"
              className="rounded-[40px] relative z-10 object-cover"
              style={{ width: '604px', height: '515px' }}
            />
            <div className="absolute inset-0 bg-blue-100 rounded-[40px] rotate-3 scale-105 -z-10 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
