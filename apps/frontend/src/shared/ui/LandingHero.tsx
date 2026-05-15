export function LandingHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex items-center py-20 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_20%,#E4EDFF_100%)]">
      {children}
    </section>
  );
}
