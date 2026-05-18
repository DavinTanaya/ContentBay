import type { FC } from 'react';
import {
  FileTextOutlined,
  FontSizeOutlined,
  NumberOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import type { FieldIcon } from '../model/content-model.types';

export const RenderFieldIcon: FC<{ icon?: FieldIcon | string; className?: string }> = ({
  icon,
  className,
}) => {
  switch (icon) {
    case 'rich-text':
      return <FileTextOutlined className={className} />;
    case 'text':
      return <FontSizeOutlined className={className} />;
    case 'number':
      return <NumberOutlined className={className} />;
    case 'calendar':
      return <CalendarOutlined className={className} />;
    case 'location':
      return <EnvironmentOutlined className={className} />;
    case 'media':
      return <PictureOutlined className={className} />;
    case 'boolean':
      return <CheckCircleOutlined className={className} />;
    case 'json':
      return <CodeOutlined className={className} />;
    case 'reference':
      return <LinkOutlined className={className} />;
    default:
      return <FileTextOutlined className={className} />; // Fallback icon
  }
};
