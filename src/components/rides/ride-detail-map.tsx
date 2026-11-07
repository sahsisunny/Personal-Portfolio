"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

interface RideDetailMapProps {
  slug: string;
  title: string;
}

export default function RideDetailMap({ slug, title }: RideDetailMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<LeafletMap | null>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;
    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      if (!mapRef.current || !isMounted) return;

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
      });
      mapInstance.current = map;

      const isDark = resolvedTheme === "dark";
      const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 18,
      }).addTo(map);

      let waypoints: { name: string; lat: number; lng: number; note: string }[] = [];
      let color = "#c2410c";

      if (slug === "patna-to-ladakh") {
        color = "#c2410c";
        waypoints = [
          { name: "Patna", lat: 25.5941, lng: 85.1376, note: "Departure from home" },
          { name: "Varanasi", lat: 25.3176, lng: 82.9739, note: "Ghats of Ganges" },
          { name: "New Delhi", lat: 28.7041, lng: 77.1025, note: "Northern corridor" },
          { name: "Manali", lat: 32.2432, lng: 77.1892, note: "Gateway to the high Himalayas" },
          { name: "Keylong & Jispa", lat: 32.5714, lng: 77.0322, note: "Bhaga river valley" },
          { name: "Sarchu", lat: 32.9061, lng: 77.5833, note: "High altitude camp (4,290m)" },
          { name: "Tanglang La", lat: 33.5074, lng: 77.7712, note: "Second highest motorable pass" },
          { name: "Leh, Ladakh", lat: 34.1526, lng: 77.5771, note: "Capital of Ladakh & Shanti Stupa" },
          { name: "Khardung La", lat: 34.2787, lng: 77.6047, note: "Pass to Nubra Valley (5,359m)" },
        ];
      } else {
        color = "#0e7490";
        waypoints = [
          { name: "Patna", lat: 25.5941, lng: 85.1376, note: "Departure point" },
          { name: "Ranchi", lat: 23.3441, lng: 85.3096, note: "Chota Nagpur plateau" },
          { name: "Raipur", lat: 21.2514, lng: 81.6296, note: "Heartland highways" },
          { name: "Hyderabad", lat: 17.3850, lng: 78.4867, note: "City of Nizams" },
          { name: "Bengaluru", lat: 12.9716, lng: 77.5946, note: "South transition" },
          { name: "Madurai", lat: 9.9252, lng: 78.1198, note: "Historic temple city" },
          { name: "Rameshwaram", lat: 9.2876, lng: 79.3129, note: "Pamban Sea Bridge & Dhanushkodi" },
        ];
      }

      const points: [number, number][] = waypoints.map((w) => [w.lat, w.lng]);

      // Route line
      L.polyline(points, {
        color,
        weight: 4,
        opacity: 0.9,
      }).addTo(map);

      // Markers
      waypoints.forEach((w, index) => {
        const isTerminal = index === 0 || index === waypoints.length - 1;
        L.circleMarker([w.lat, w.lng], {
          radius: isTerminal ? 8 : 5,
          fillColor: isTerminal ? "#ffffff" : color,
          color: color,
          weight: 3,
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(`<b>${w.name}</b><br><span style="font-size: 11px;">${w.note}</span>`);
      });

      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [slug, resolvedTheme]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-md">
      <div ref={mapRef} className="w-full h-[400px] sm:h-[480px] bg-surface-2" />
      <div className="absolute top-3 right-3 z-[1000] bg-surface/90 backdrop-blur-md border border-border rounded-lg px-3 py-1.5 text-xs font-mono">
        <span>Route: {title}</span>
      </div>
    </div>
  );
}
