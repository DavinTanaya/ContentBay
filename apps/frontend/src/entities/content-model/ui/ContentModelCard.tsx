import { Card, Avatar, Tooltip } from 'antd';
import {
  CalendarOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { getAvatarColor } from '@/entities/workspace';
import { RenderModelIcon } from './RenderModelIcon';
import type { ContentModelCardProps } from '../model/types';
import { useContentModelCard } from '../model/useContentModelCard';

export interface ContentModelCardPropsExtended extends ContentModelCardProps {
  formattedDate?: string;
}

export function ContentModelCard({
  model,
  authorName,
  authorInitial,
  onClick,
  formattedDate: propFormattedDate,
}: ContentModelCardPropsExtended) {
  const { formattedDate: hookFormattedDate } = useContentModelCard(model);
  const formattedDate =
    propFormattedDate && propFormattedDate !== 'N/A'
      ? propFormattedDate
      : hookFormattedDate;
  const displayName = authorName || 'System';
  console.log('author name: ', authorName);
  const initial = authorInitial || 'S';

  return (
    <Card
      onClick={() => onClick?.(model.id)}
      className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none hover:ring-blue-200 hover:shadow-[0_12px_32px_rgba(0,100,255,0.12)] hover:-translate-y-[2px] transition-all duration-500 group cursor-pointer border-none"
      styles={{
        body: {
          padding: '32px',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <RenderModelIcon icon={model.icon} size={24} />
          </div>
          <h3 className="font-poppins text-[22px] font-bold text-gray-12 m-0 leading-tight tracking-tight">
            {model.name}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 text-blue-7 rounded-lg text-[13px] font-semibold tracking-wide ring-1 ring-blue-100/50">
            <FileTextOutlined className="text-blue-5 text-[14px]" />
            <span>{model.fields?.length || 0} Fields</span>
          </div>
        </div>

        <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
          {model.description || 'No description provided'}
        </p>

        <div className="flex items-center gap-2 text-[13px] text-gray-600 font-regular tracking-wide mt-auto">
          <CalendarOutlined className="text-[12px]" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div>
        <div className="border-t border-gray-2/70 my-5" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tooltip title={displayName} placement="top">
              <Avatar
                size="small"
                className="text-white text-[11px] font-semibold font-poppins flex items-center justify-center"
                style={{ backgroundColor: getAvatarColor(displayName) }}
              >
                <span className="relative top-[1px]">{initial}</span>
              </Avatar>
            </Tooltip>
            <span className="text-[12px] font-medium text-gray-500 hidden sm:inline-block">
              {displayName}
            </span>
          </div>

          <div className="font-poppins text-[13px] font-semibold text-gray-6 group-hover:text-blue-6 flex items-center gap-1.5 transition-colors duration-200">
            <span>Enter model</span>
            <ArrowRightOutlined className="text-[11px] transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Card>
  );
}
