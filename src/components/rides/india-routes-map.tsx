"use client";

import * as React from "react";
import type { Map as LeafletMap, TileLayer as LeafletTileLayer } from "leaflet";
import { Layers, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface IndiaRoutesMapProps {
  className?: string;
}

type MapLayerType = "google-streets" | "google-terrain" | "google-satellite" | "osm";

const TILE_PROVIDERS: Record<
  MapLayerType,
  { label: string; url: string; subdomains?: string[]; attribution: string; maxZoom: number }
> = {
  "google-streets": {
    label: "Google Roads",
    url: "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps",
    maxZoom: 20,
  },
  "google-terrain": {
    label: "Google Terrain",
    url: "https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps Terrain",
    maxZoom: 20,
  },
  "google-satellite": {
    label: "Google Satellite",
    url: "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps Satellite",
    maxZoom: 20,
  },
  osm: {
    label: "OpenStreetMap",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
};

export default function IndiaRoutesMap({ className = "" }: IndiaRoutesMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<LeafletMap | null>(null);
  const activeTileLayer = React.useRef<LeafletTileLayer | null>(null);
  const [selectedLayer, setSelectedLayer] = React.useState<MapLayerType>("google-streets");

  // Switch tile layer when user toggles
  const switchLayer = React.useCallback(async (type: MapLayerType) => {
    setSelectedLayer(type);
    if (!mapInstance.current) return;

    const L = (await import("leaflet")).default;
    const provider = TILE_PROVIDERS[type];

    if (activeTileLayer.current) {
      mapInstance.current.removeLayer(activeTileLayer.current);
    }

    const newLayer = L.tileLayer(provider.url, {
      subdomains: provider.subdomains || [],
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
    });

    newLayer.addTo(mapInstance.current);
    activeTileLayer.current = newLayer;
  }, []);

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

      // Initial Google Maps tile layer (Free, no watermark, fast)
      const provider = TILE_PROVIDERS["google-streets"];
      const initialLayer = L.tileLayer(provider.url, {
        subdomains: provider.subdomains || [],
        attribution: provider.attribution,
        maxZoom: provider.maxZoom,
      }).addTo(map);

      activeTileLayer.current = initialLayer;

      // Coordinates
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

      // Route 1: Patna -> Ladakh (Orange)
      L.polyline(ladakhRoute, {
        color: "#ea580c",
        weight: 5,
        opacity: 0.9,
      }).addTo(map);

      // Route 2: Patna -> Rameshwaram (Cyan / Blue)
      L.polyline(rameshwaramRoute, {
        color: "#0284c7",
        weight: 5,
        opacity: 0.9,
      }).addTo(map);

      // Origin Marker: Patna
      L.circleMarker(patna, {
        radius: 8,
        fillColor: "#e11d48",
        color: "#ffffff",
        weight: 2.5,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(
          "<div class='p-1 font-sans text-xs'><b>Patna, Bihar</b><br/>Basecamp & Expedition Origin</div>"
        );

      // Destination 1: Leh, Ladakh
      L.circleMarker([34.1526, 77.5771], {
        radius: 8,
        fillColor: "#ea580c",
        color: "#ffffff",
        weight: 2.5,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(
          "<div class='p-1 font-sans text-xs'><b>Leh, Ladakh</b><br/>17,590 ft Khardung La Pass</div>"
        );

      // Destination 2: Rameshwaram
      L.circleMarker([9.2876, 79.3129], {
        radius: 8,
        fillColor: "#0284c7",
        color: "#ffffff",
        weight: 2.5,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(
          "<div class='p-1 font-sans text-xs'><b>Rameshwaram, Tamil Nadu</b><br/>Pamban Sea Bridge & Indian Ocean</div>"
        );

      // Fit bounds to cover both routes
      const allCoords = [...ladakhRoute, ...rameshwaramRoute];
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-surface-2 ${className}`}
    >
      {/* Map Canvas */}
      <div ref={mapRef} className="w-full h-[450px] sm:h-[550px]" />

      {/* Modern Map Layer Selector (Top-Right) */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1 bg-surface/90 backdrop-blur-md border border-border p-1 rounded-xl shadow-lg">
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-muted uppercase font-bold">
          <Layers className="w-3 h-3 text-accent" />
          <span>Layer:</span>
        </div>
        {(
          Object.keys(TILE_PROVIDERS) as MapLayerType[]
        ).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => switchLayer(type)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedLayer === type
                ? "bg-accent text-accent-contrast font-bold shadow-xs scale-102"
                : "text-muted hover:text-text hover:bg-surface-2"
            }`}
          >
            {TILE_PROVIDERS[type].label.replace("Google ", "")}
          </button>
        ))}
      </div>

      {/* Route Legend (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-surface/90 backdrop-blur-md border border-border rounded-xl p-3 text-xs font-mono space-y-1.5 shadow-lg">
        <div className="flex items-center gap-2 font-bold text-text mb-1 border-b border-border/60 pb-1">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>Expedition Corridors</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#ea580c] rounded-full" />
          <span className="text-text font-medium">Patna ➔ Ladakh (3,850 km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#0284c7] rounded-full" />
          <span className="text-text font-medium">Patna ➔ Rameshwaram (5,420 km)</span>
        </div>
      </div>
    </div>
  );
}