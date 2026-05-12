import { Button } from 'antd';
import { GithubIcon, DiscordIcon } from '@icons';
import { ResourceAssets } from '../../assets';

export function CommunitySection() {
  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div
              className="inline-flex items-center px-4 py-1.5 rounded-full text-white text-[13px] font-bold mb-6"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #0050B3 0%, #096DD9 100%)',
              }}
            >
              Community
            </div>
            <h2 className="text-[52px] font-semibold text-slate-900 mb-6 leading-[1.1]">
              Join our{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #0050B3 0%, #096DD9 100%)',
                }}
              >
                developer community
              </span>
            </h2>
            <p className="text-lg text-slate-500 mb-6 max-w-lg leading-relaxed">
              Connect with 10.000+ developers, share knowledge, and get help
              from the community
            </p>

            <div className="space-y-6 max-w-[545px]">
              <Button
                shape="round"
                className="border-none text-white flex items-center justify-between gap-8 hover:opacity-90 transition-opacity shadow-xl group"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #002766 0%, #0050B3 100%)',
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
                  <GithubIcon className="w-10 h-10 text-white" />
                  <span className="font-medium text-[16px] leading-[24px] text-white font-['Poppins']">
                    View Github Discussions
                  </span>
                </div>
                <svg
                  className="w-8 h-8 text-white"
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
                className="border-none text-white flex items-center justify-between gap-8 hover:opacity-90 transition-opacity shadow-xl group"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #2F54EB 0%, #597EF7 100%)',
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
                  <DiscordIcon className="w-10 h-10 text-white" />
                  <span className="font-medium text-[16px] leading-[24px] text-white font-['Poppins']">
                    Join Discord Server
                  </span>
                </div>
                <svg
                  className="w-8 h-8 text-white"
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
