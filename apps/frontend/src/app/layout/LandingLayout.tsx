import { CTA } from '@/widgets/cta';
import { FooterLanding } from '@/widgets/footer';
import { NavbarLanding } from '@/widgets/navbar';
import { Outlet } from 'react-router-dom';

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarLanding />
      <main className="grow">
        <Outlet />
      </main>
      <CTA />
      <FooterLanding />
    </div>
  );
}
