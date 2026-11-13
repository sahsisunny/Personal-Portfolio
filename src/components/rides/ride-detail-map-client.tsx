"use client";

import dynamic from "next/dynamic";

const RideDetailMap = dynamic(() => import("@/components/rides/ride-detail-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[480px] rounded-2xl border border-border bg-surface-2 animate-pulse flex items-center justify-center text-xs font-mono text-muted">
      Loading interactive expedition route map...
    </div>
  ),
});

export function RideDetailMapClient({
  slug,
  title,
  coordinates = [],
}: {
  slug: string;
  title: string;
  coordinates?: [number, number][];
}) {
  return <RideDetailMap slug={slug} title={title} coordinates={coordinates} />;
}

