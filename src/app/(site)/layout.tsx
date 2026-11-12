import { getPerson, getSocials, getFeatureFlags } from "@/lib/data";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = getPerson();
  const socials = getSocials();
  const features = getFeatureFlags();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text transition-colors bg-tech-grid relative overflow-x-hidden print:min-h-0 print:bg-white print:bg-none print:text-black">
      {/* Subtle radial ambient glow at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-5xl rounded-full bg-accent/5 blur-[120px] print:hidden"
      />
      <SiteNavbar name={person.name} features={features} />
      <main id="main-content" className="flex-1 relative z-10 print:bg-white print:p-0 print:m-0">
        {children}
      </main>
      <SiteFooter name={person.name} socials={socials} email={person.email} features={features} />
    </div>
  );
}

