import { CTA } from '@/widgets/cta';
import { FooterLanding } from '@/widgets/footer';
import { NavbarLanding } from '@/widgets/navbar';
import { Outlet, useLocation } from 'react-router-dom';

export function LandingLayout() {
  const location = useLocation();
  const isDocPage = location.pathname.toLowerCase().startsWith('/documentation');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarLanding />
      <main className="grow flex flex-col">
        <Outlet />
      </main>
      {!isDocPage && <CTA />}
      {!isDocPage && <FooterLanding />}
    </div>
  );
}
