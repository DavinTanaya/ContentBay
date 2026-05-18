import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '@/entities/session';
import { PATH } from '@/shared/constants/routes';

export const TAB_KEYS: Record<string, string> = {
  'content-model': PATH.contentbay.contentModel,
  content: PATH.contentbay.content,
};

export const useNavbarContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSession();

  const handleLogout = () => {
    navigate(PATH.landing.home, { replace: true });
    setTimeout(() => {
      auth.logout();
    }, 10);
  };

  const activeKey = location.pathname.startsWith(PATH.contentbay.contentModel)
    ? 'content-model'
    : location.pathname.startsWith(PATH.contentbay.content)
      ? 'content'
      : 'content-model';

  const handleTabChange = (key: string) => {
    const path = TAB_KEYS[key];
    if (path) {
      navigate(path);
    }
  };

  return {
    activeKey,
    handleTabChange,
    handleLogout,
  };
};
