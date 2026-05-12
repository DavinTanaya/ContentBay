import { Outlet } from 'react-router-dom';
import NavbarLanding from '@/shared/components/ui/landing-page/NavbarLanding';
import FooterLanding from '@/shared/components/ui/landing-page/FooterLanding';
import { CTA } from '@/shared/components/ui/landing-page/CTA';

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarLanding />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CTA />
      <FooterLanding />
    </div>
  );
}
