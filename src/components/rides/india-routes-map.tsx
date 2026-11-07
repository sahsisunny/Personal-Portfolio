"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

interface IndiaRoutesMapProps {
  className?: string;
}

export default function IndiaRoutesMap({ className = "" }: IndiaRoutesMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<LeafletMap | null>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      // Clean up existing instance if any
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      if (!mapRef.current || !isMounted) return;

      // Fix standard leaflet icon path issues in bundlers
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Center around central India
      const map = L.map(mapRef.current, {
        center: [22.5, 80.0],
        zoom: 5,
        scrollWheelZoom: false,
      });

      mapInstance.current = map;

      // Dark vs Light tile layers
      const isDark = resolvedTheme === "dark";
      const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 18,
      }).addTo(map);

      // Coordinates:
      const patna: [number, number] = [25.5941, 85.1376];
      const ladakhRoute: [number, number][] = [
        patna,
        [25.3176, 82.9739], // Varanasi
        [26.8467, 80.9462], // Lucknow
        [28.7041, 77.1025], // Delhi
        [30.7333, 76.7794], // Chandigarh
        [32.2432, 77.1892], // Manali
        [32.9061, 77.5833], // Sarchu
        [34.1526, 77.5771], // Leh, Ladakh
      ];

      const rameshwaramRoute: [number, number][] = [
        patna,
        [23.3441, 85.3096], // Ranchi
        [21.2514, 81.6296], // Raipur
        [17.3850, 78.4867], // Hyderabad
        [12.9716, 77.5946], // Bengaluru
        [9.9252, 78.1198],  // Madurai
        [9.2876, 79.3129],  // Rameshwaram
      ];

      // Draw Route 1: Patna -> Ladakh (Orange)
      L.polyline(ladakhRoute, {
        color: "#c2410c",
        weight: 4,
        opacity: 0.85,
        dashArray: "6, 6",
      }).addTo(map);

      // Draw Route 2: Patna -> Rameshwaram (Glacier blue/Cyan)
      L.polyline(rameshwaramRoute, {
        color: "#0e7490",
        weight: 4,
        opacity: 0.85,
        dashArray: "6, 6",
      }).addTo(map);

      // Origin Marker: Patna
      L.circleMarker(patna, {
        radius: 7,
        fillColor: "#e11d48",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup("<b>Patna, Bihar</b><br>Basecamp & Expedition Origin");

      // Destination 1: Leh, Ladakh
      L.circleMarker([34.1526, 77.5771], {
        radius: 7,
        fillColor: "#c2410c",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup("<b>Leh, Ladakh</b><br>Himalayan Passes & High-altitude Deserts");

      // Destination 2: Rameshwaram
      L.circleMarker([9.2876, 79.3129], {
        radius: 7,
        fillColor: "#0e7490",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup("<b>Rameshwaram, Tamil Nadu</b><br>Southern tip of India & Pamban Sea Bridge");

      // Fit bounds to cover both routes
      const allCoords = [...ladakhRoute, ...rameshwaramRoute];
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [resolvedTheme]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-border shadow-lg ${className}`}>
      <div ref={mapRef} className="w-full h-[450px] sm:h-[550px] bg-surface-2" />
      <div className="absolute bottom-3 left-3 z-[1000] bg-surface/90 backdrop-blur-md border border-border rounded-lg p-2.5 text-xs font-mono space-y-1 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#c2410c] rounded" />
          <span className="text-text font-semibold">Patna ➔ Ladakh (North)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#0e7490] rounded" />
          <span className="text-text font-semibold">Patna ➔ Rameshwaram (South)</span>
        </div>
      </div>
    </div>
  );
}
