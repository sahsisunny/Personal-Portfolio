import { getSocials } from "@/lib/data";
import { RidesNavbar } from "@/components/layout/rides-navbar";
import { RidesFooter } from "@/components/layout/rides-footer";
import { RiderBackgroundEffects } from "@/components/rides/rider-background-effects";

export const metadata = {
  title: "On Two Wheels | Solo Motorcycle Touring across India",
  description:
    "Solo motorcycle adventures from Patna to Ladakh and Rameshwaram. Maps, stories, timelines and photos from the road.",
};

export default function RidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socials = getSocials();

  return (
    <div className="rides-realm flex min-h-screen flex-col bg-bg text-text transition-colors relative overflow-x-hidden">
      <RiderBackgroundEffects />
      <RidesNavbar />
      <main id="main-content" className="flex-1 relative z-10">
        {children}
      </main>
      <RidesFooter socials={socials} />
    </div>
  );
}
