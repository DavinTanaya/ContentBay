import { useSession } from '@/entities/session';

export function UserMenuHeader() {
  const { user } = useSession();
  if (!user) return null;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex flex-col px-1 py-0.5">
      <span className="label-xs-semibold text-black">{fullName}</span>
      <span className="label-xs-regular text-gray-7 mt-1.5">{user.email}</span>
    </div>
  );
}
