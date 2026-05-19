import {
  User,
  FolderOpen,
  FileText,
  Box,
  Image as ImageIcon,
  Settings,
  MapPin,
  Database,
} from 'lucide-react';
import type { RenderModelIconProps } from '../model/types';

export function RenderModelIcon({
  icon,
  size = 24,
  className,
}: RenderModelIconProps) {
  switch (icon) {
    case 'person':
      return <User size={size} className={className} />;
    case 'folder':
      return <FolderOpen size={size} className={className} />;
    case 'document':
      return <FileText size={size} className={className} />;
    case 'box':
      return <Box size={size} className={className} />;
    case 'media':
      return <ImageIcon size={size} className={className} />;
    case 'settings':
      return <Settings size={size} className={className} />;
    case 'map-pin':
      return <MapPin size={size} className={className} />;
    case 'database':
      return <Database size={size} className={className} />;
    default:
      return <Box size={size} className={className} />; // Fallback icon
  }
}
