import { NavbarContent } from '@/widgets/navbar';
import { Outlet } from 'react-router-dom';

export function ContentBayLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <NavbarContent />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
