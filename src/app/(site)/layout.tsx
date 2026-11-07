import { getPerson, getSocials } from "@/lib/data";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = getPerson();
  const socials = getSocials();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text transition-colors bg-tech-grid relative overflow-x-hidden">
      {/* Subtle radial ambient glow at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-5xl rounded-full bg-accent/5 blur-[120px]"
      />
      <SiteNavbar name={person.name} />
      <main id="main-content" className="flex-1 relative z-10">
        {children}
      </main>
      <SiteFooter name={person.name} socials={socials} email={person.email} />
    </div>
  );
}

