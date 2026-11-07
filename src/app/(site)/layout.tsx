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
    <div className="flex min-h-screen flex-col bg-bg text-text transition-colors">
      <SiteNavbar name={person.name} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter name={person.name} socials={socials} email={person.email} />
    </div>
  );
}

