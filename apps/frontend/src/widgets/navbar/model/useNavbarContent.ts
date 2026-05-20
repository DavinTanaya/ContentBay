import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '@/entities/session';
import { PATH, getContentModelPath, getContentPath } from '@/shared/constants/routes';
import { useActiveWorkspaceId } from '@/entities/workspace';

export const useNavbarContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSession();
  const activeSpaceId = useActiveWorkspaceId();

  const handleLogout = () => {
    navigate(PATH.landing.home, { replace: true });
    setTimeout(() => {
      auth.logout();
    }, 10);
  };

  const activeKey = location.pathname.includes('/content-model')
    ? 'content-model'
    : location.pathname.includes('/content')
      ? 'content'
      : 'content-model';

  const handleTabChange = (key: string) => {
    if (key === 'content-model') {
      navigate(getContentModelPath(activeSpaceId));
    } else if (key === 'content') {
      navigate(getContentPath(activeSpaceId));
    }
  };

  return {
    activeKey,
    handleTabChange,
    handleLogout,
  };
};
