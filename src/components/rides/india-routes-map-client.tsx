"use client";

import dynamic from "next/dynamic";

const IndiaRoutesMap = dynamic(() => import("@/components/rides/india-routes-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] sm:h-[550px] rounded-2xl border border-border bg-surface-2 animate-pulse flex items-center justify-center text-xs font-mono text-muted">
      Loading interactive route map...
    </div>
  ),
});

export function IndiaRoutesMapClient() {
  return <IndiaRoutesMap />;
}
