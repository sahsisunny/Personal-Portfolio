"use client";

import * as React from "react";
import type { Map as LeafletMap, TileLayer as LeafletTileLayer } from "leaflet";
import { Layers, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface RideDetailMapProps {
  slug: string;
  title: string;
}

type MapLayerType = "google-streets" | "google-terrain" | "google-satellite" | "osm";

const TILE_PROVIDERS: Record<
  MapLayerType,
  { label: string; url: string; subdomains?: string[]; attribution: string; maxZoom: number }
> = {
  "google-streets": {
    label: "Roads",
    url: "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps",
    maxZoom: 20,
  },
  "google-terrain": {
    label: "Terrain",
    url: "https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps Terrain",
    maxZoom: 20,
  },
  "google-satellite": {
    label: "Satellite",
    url: "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    subdomains: ["0", "1", "2", "3"],
    attribution: "&copy; Google Maps Satellite",
    maxZoom: 20,
  },
  osm: {
    label: "OSM",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
};

export default function RideDetailMap({ slug, title }: RideDetailMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<LeafletMap | null>(null);
  const activeTileLayer = React.useRef<LeafletTileLayer | null>(null);
  const [selectedLayer, setSelectedLayer] = React.useState<MapLayerType>("google-streets");

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

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      if (!mapRef.current || !isMounted) return;

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
      });
      mapInstance.current = map;

      const provider = TILE_PROVIDERS["google-streets"];
      const initialLayer = L.tileLayer(provider.url, {
        subdomains: provider.subdomains || [],
        attribution: provider.attribution,
        maxZoom: provider.maxZoom,
      }).addTo(map);

      activeTileLayer.current = initialLayer;

      let waypoints: { name: string; lat: number; lng: number; note: string }[] = [];
      let color = "#ea580c";

      if (slug === "patna-to-ladakh") {
        color = "#ea580c";
        waypoints = [
          { name: "Patna", lat: 25.5941, lng: 85.1376, note: "Departure from home" },
          { name: "Varanasi", lat: 25.3176, lng: 82.9739, note: "Ghats of Ganges" },
          { name: "New Delhi", lat: 28.7041, lng: 77.1025, note: "Northern corridor" },
          { name: "Manali", lat: 32.2432, lng: 77.1892, note: "Gateway to the high Himalayas" },
          { name: "Keylong & Jispa", lat: 32.5714, lng: 77.0322, note: "Bhaga river valley" },
          { name: "Sarchu", lat: 32.9061, lng: 77.5833, note: "High altitude camp (4,290m)" },
          { name: "Tanglang La", lat: 33.5074, lng: 77.7712, note: "Second highest motorable pass" },
          { name: "Leh, Ladakh", lat: 34.1526, lng: 77.5771, note: "Capital of Ladakh & Shanti Stupa" },
          { name: "Khardung La", lat: 34.2787, lng: 77.6047, note: "Summit at 17,590 ft (5,359m)" },
          { name: "Pangong Tso", lat: 33.7595, lng: 78.6674, note: "Endorheic salt lake at 14,270 ft" },
        ];
      } else {
        color = "#0284c7";
        waypoints = [
          { name: "Patna", lat: 25.5941, lng: 85.1376, note: "Departure point" },
          { name: "Ranchi", lat: 23.3441, lng: 85.3096, note: "Chota Nagpur plateau" },
          { name: "Raipur", lat: 21.2514, lng: 81.6296, note: "Heartland highways" },
          { name: "Hyderabad", lat: 17.3850, lng: 78.4867, note: "City of Nizams" },
          { name: "Bengaluru", lat: 12.9716, lng: 77.5946, note: "South transition" },
          { name: "Madurai", lat: 9.9252, lng: 78.1198, note: "Historic temple city" },
          { name: "Pamban Sea Bridge", lat: 9.2789, lng: 79.2062, note: "Ocean sea crossing on two wheels" },
          { name: "Dhanushkodi", lat: 9.1783, lng: 79.4183, note: "Edge of the Indian map" },
        ];
      }

      const points: [number, number][] = waypoints.map((w) => [w.lat, w.lng]);

      // Route line
      L.polyline(points, {
        color,
        weight: 5,
        opacity: 0.9,
      }).addTo(map);

      // Markers
      waypoints.forEach((w, index) => {
        const isTerminal = index === 0 || index === waypoints.length - 1;
        L.circleMarker([w.lat, w.lng], {
          radius: isTerminal ? 9 : 6,
          fillColor: isTerminal ? "#ffffff" : color,
          color: color,
          weight: 2.5,
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(
            `<div class="p-1 font-sans text-xs">
              <strong class="text-sm font-bold">${w.name}</strong>
              <div class="text-muted-foreground mt-0.5">${w.note}</div>
              <div class="text-[10px] text-muted font-mono mt-1">${w.lat.toFixed(4)}° N, ${w.lng.toFixed(4)}° E</div>
            </div>`
          );
      });

      const bounds = L.latLngBounds(points);
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
  }, [slug]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-surface-2">
      <div ref={mapRef} className="w-full h-[400px] sm:h-[500px]" />

      {/* Layer Toggle Button (Top-Right) */}
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
            className={`px-2 py-0.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedLayer === type
                ? "bg-accent text-accent-contrast font-bold shadow-xs scale-102"
                : "text-muted hover:text-text hover:bg-surface-2"
            }`}
          >
            {TILE_PROVIDERS[type].label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 z-[1000] bg-surface/90 backdrop-blur-md border border-border rounded-xl p-2.5 px-3 text-xs font-mono shadow-lg flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-accent" />
        <span className="font-bold text-text">{title} Route Log</span>
      </div>
    </div>
  );
}