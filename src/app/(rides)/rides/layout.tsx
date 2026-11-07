import { getSocials } from "@/lib/data";
import { RidesNavbar } from "@/components/layout/rides-navbar";
import { RidesFooter } from "@/components/layout/rides-footer";

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
    <div className="rides-realm flex min-h-screen flex-col bg-bg text-text transition-colors">
      <RidesNavbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <RidesFooter socials={socials} />
    </div>
  );
}
