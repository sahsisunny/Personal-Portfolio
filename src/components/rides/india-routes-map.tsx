"use client";

import * as React from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layers, MapPin, RotateCcw } from "lucide-react";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

export interface RouteDisplayItem {
  slug: string;
  title: string;
  color?: string;
  distanceKm?: number | null;
  coordinates: [number, number][]; // [latitude, longitude]
}

interface IndiaRoutesMapProps {
  className?: string;
  routes?: RouteDisplayItem[];
}

type MapLayerType = "dark" | "satellite";

const OPENFREEMAP_DARK_STYLE = "https://tiles.openfreemap.org/styles/dark";

const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    "esri-satellite": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, USGS, NOAA",
      maxzoom: 18,
    },
  },
  layers: [
    {
      id: "esri-satellite-layer",
      type: "raster",
      source: "esri-satellite",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const TILE_PROVIDERS: Record<
  MapLayerType,
  { label: string; style: string | maplibregl.StyleSpecification }
> = {
  dark: {
    label: "OpenFreeMap Dark",
    style: OPENFREEMAP_DARK_STYLE,
  },
  satellite: {
    label: "Satellite",
    style: SATELLITE_STYLE,
  },
};

const DEFAULT_ROUTE_COLORS = [
  "#ea580c", // Vibrant Orange
  "#38bdf8", // Sky Blue
  "#10b981", // Emerald
  "#a855f7", // Purple
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Coral
];

export default function IndiaRoutesMap({ className = "", routes = [] }: IndiaRoutesMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<maplibregl.Marker[]>([]);
  const isReadyRef = React.useRef<boolean>(false);
  const [selectedLayer, setSelectedLayer] = React.useState<MapLayerType>("dark");

  const activeRoutes = React.useMemo(
    () => (routes || []).filter((r) => r.coordinates && r.coordinates.length > 0),
    [routes]
  );

  // Enhance OpenFreeMap Dark contrast so land, oceans, and borders are clearly distinct
  const enhanceContrast = React.useCallback((map: maplibregl.Map) => {
    try {
      if (map.getLayer("background")) {
        map.setPaintProperty("background", "background-color", "#111822");
      }
      if (map.getLayer("water")) {
        map.setPaintProperty("water", "fill-color", "#070b10");
      }
      if (map.getLayer("boundary_country_z0-4")) {
        map.setPaintProperty("boundary_country_z0-4", "line-color", "#475569");
        map.setPaintProperty("boundary_country_z0-4", "line-width", 1.5);
      }
      if (map.getLayer("boundary_state")) {
        map.setPaintProperty("boundary_state", "line-color", "#334155");
        map.setPaintProperty("boundary_state", "line-width", 1.2);
      }
    } catch {
      // Ignore if layer not found
    }
  }, []);

  const renderRoutesAndMarkers = React.useCallback(
    (map: maplibregl.Map) => {
      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Basecamp: Patna [85.1376, 25.5941] in [lng, lat]
      const patnaLngLat: [number, number] = [85.1376, 25.5941];

      const basecampEl = document.createElement("div");
      basecampEl.style.width = "16px";
      basecampEl.style.height = "16px";
      basecampEl.style.borderRadius = "50%";
      basecampEl.style.backgroundColor = "#e11d48";
      basecampEl.style.border = "2.5px solid #ffffff";
      basecampEl.style.boxShadow = "0 0 12px rgba(225, 29, 72, 0.9)";
      basecampEl.style.cursor = "pointer";

      const basecampMarker = new maplibregl.Marker({ element: basecampEl })
        .setLngLat(patnaLngLat)
        .setPopup(
          new maplibregl.Popup({ offset: 12, closeButton: false }).setHTML(
            `<div class="p-1 font-mono text-xs"><b>Patna, Bihar</b><br/>Expedition Basecamp</div>`
          )
        )
        .addTo(map);

      markersRef.current.push(basecampMarker);

      if (activeRoutes.length === 0) return;

      activeRoutes.forEach((route, idx) => {
        const color = route.color || DEFAULT_ROUTE_COLORS[idx % DEFAULT_ROUTE_COLORS.length];
        const sourceId = `source-${route.slug}`;
        const casingLayerId = `layer-${route.slug}-casing`;
        const lineLayerId = `layer-${route.slug}-line`;

        // Convert [lat, lng] to GeoJSON [lng, lat]
        const geojsonCoords: [number, number][] = route.coordinates.map((c) => [c[1], c[0]]);

        const featureData: GeoJSON.Feature<GeoJSON.LineString> = {
          type: "Feature",
          properties: {
            slug: route.slug,
            title: route.title,
            distanceKm: route.distanceKm,
          },
          geometry: {
            type: "LineString",
            coordinates: geojsonCoords,
          },
        };

        if (!map.getSource(sourceId)) {
          map.addSource(sourceId, {
            type: "geojson",
            data: featureData,
          });
        } else {
          (map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(featureData);
        }

        // Dark casing line
        if (!map.getLayer(casingLayerId)) {
          map.addLayer({
            id: casingLayerId,
            type: "line",
            source: sourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#000000",
              "line-width": 6,
              "line-opacity": 0.8,
            },
          });
        }

        // Vibrant primary polyline
        if (!map.getLayer(lineLayerId)) {
          map.addLayer({
            id: lineLayerId,
            type: "line",
            source: sourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": color,
              "line-width": 4,
              "line-opacity": 0.95,
            },
          });

          // Click popup on line
          map.on("click", lineLayerId, (e) => {
            new maplibregl.Popup({ offset: 10 })
              .setLngLat(e.lngLat)
              .setHTML(
                `<div class="p-1 font-mono text-xs"><b>${route.title}</b>${
                  route.distanceKm ? `<br/>${route.distanceKm.toLocaleString()} km` : ""
                }</div>`
              )
              .addTo(map);
          });

          map.on("mouseenter", lineLayerId, () => {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", lineLayerId, () => {
            map.getCanvas().style.cursor = "";
          });
        }

        // Endpoint marker
        const endCoord = geojsonCoords[geojsonCoords.length - 1];
        const endpointEl = document.createElement("div");
        endpointEl.style.width = "12px";
        endpointEl.style.height = "12px";
        endpointEl.style.borderRadius = "50%";
        endpointEl.style.backgroundColor = color;
        endpointEl.style.border = "2px solid #ffffff";
        endpointEl.style.boxShadow = `0 0 10px ${color}`;
        endpointEl.style.cursor = "pointer";

        const endMarker = new maplibregl.Marker({ element: endpointEl })
          .setLngLat(endCoord)
          .setPopup(
            new maplibregl.Popup({ offset: 10, closeButton: false }).setHTML(
              `<div class="p-1 font-mono text-xs"><b>${route.title}</b><br/>Expedition Endpoint</div>`
            )
          )
          .addTo(map);

        markersRef.current.push(endMarker);
      });
    },
    [activeRoutes]
  );

  const switchLayer = React.useCallback(
    (type: MapLayerType) => {
      setSelectedLayer(type);
      const map = mapInstance.current;
      if (!map) return;

      const onStyleReady = () => {
        if (type === "dark") {
          enhanceContrast(map);
        }
        renderRoutesAndMarkers(map);
        map.resize();
      };

      // Attach listener BEFORE setStyle
      map.once("style.load", onStyleReady);
      map.setStyle(TILE_PROVIDERS[type].style);
    },
    [enhanceContrast, renderRoutesAndMarkers]
  );

  const focusRoute = React.useCallback((route: RouteDisplayItem) => {
    if (!mapInstance.current || !route.coordinates || route.coordinates.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    route.coordinates.forEach((c) => bounds.extend([c[1], c[0]]));
    mapInstance.current.fitBounds(bounds, { padding: 60, maxZoom: 10, duration: 1200 });
  }, []);

  const resetView = React.useCallback(() => {
    if (!mapInstance.current) return;
    if (activeRoutes.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      bounds.extend([85.1376, 25.5941]); // Basecamp Patna
      activeRoutes.forEach((route) => {
        route.coordinates.forEach((c) => bounds.extend([c[1], c[0]]));
      });
      mapInstance.current.fitBounds(bounds, { padding: 45, maxZoom: 9, duration: 1000 });
    } else {
      mapInstance.current.flyTo({ center: [78.9629, 22.5937], zoom: 4.5, duration: 1000 });
    }
  }, [activeRoutes]);

  // Initialize MapLibre ONCE on mount
  React.useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: OPENFREEMAP_DARK_STYLE,
      center: [78.9629, 22.5937], // Center of India [lng, lat]
      zoom: 4.5,
      scrollZoom: false,
      attributionControl: { compact: true },
    });

    mapInstance.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

    const setupMap = () => {
      if (!isMounted || isReadyRef.current) return;
      isReadyRef.current = true;

      enhanceContrast(map);
      renderRoutesAndMarkers(map);
      map.resize();

      if (activeRoutes.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([85.1376, 25.5941]); // Basecamp Patna
        activeRoutes.forEach((route) => {
          route.coordinates.forEach((c) => bounds.extend([c[1], c[0]]));
        });
        map.fitBounds(bounds, { padding: 45, maxZoom: 9 });
      }
    };

    if (map.isStyleLoaded()) {
      setupMap();
    } else {
      map.once("load", setupMap);
      map.once("style.load", setupMap);
    }

    const t1 = setTimeout(() => {
      if (isMounted) map.resize();
    }, 200);

    const t2 = setTimeout(() => {
      if (isMounted) map.resize();
    }, 600);

    return () => {
      isMounted = false;
      isReadyRef.current = false;
      clearTimeout(t1);
      clearTimeout(t2);
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapInstance.current = null;
    };
  }, []); // Run once on mount

  // Update routes when activeRoutes changes without re-creating the map
  React.useEffect(() => {
    if (mapInstance.current && isReadyRef.current) {
      renderRoutesAndMarkers(mapInstance.current);
    }
  }, [renderRoutesAndMarkers]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-[#111822] ${className}`}
    >
      <div ref={mapContainerRef} className="w-full h-[450px] sm:h-[550px]" />

      {/* Style Layer Selector & Reset Control */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-md border border-border p-1 rounded-xl shadow-lg">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-muted uppercase font-bold">
            <Layers className="w-3 h-3 text-accent" />
            <span>Style:</span>
          </div>
          {(Object.keys(TILE_PROVIDERS) as MapLayerType[]).map((type) => (
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
              {TILE_PROVIDERS[type].label}
            </button>
          ))}
        </div>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={resetView}
          title="Reset map view to all routes"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-surface/90 backdrop-blur-md border border-border hover:border-accent text-muted hover:text-text rounded-xl shadow-lg text-xs font-mono font-medium transition-all cursor-pointer hover:bg-surface-2 group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-accent group-hover:-rotate-45 transition-transform duration-300" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Interactive Route Legend */}
      <div className="absolute bottom-3 left-3 z-10 bg-surface/90 backdrop-blur-md border border-border rounded-xl p-3 text-xs font-mono space-y-1.5 shadow-lg max-w-[300px]">
        <div className="flex items-center justify-between font-bold text-text mb-1 border-b border-border/60 pb-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>Expedition Corridors</span>
          </div>
          <button
            type="button"
            onClick={resetView}
            className="text-[10px] text-accent hover:underline cursor-pointer font-normal flex items-center gap-1"
            title="Reset overview"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        </div>
        {activeRoutes.length > 0 ? (
          <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
            {activeRoutes.map((r, idx) => {
              const color = r.color || DEFAULT_ROUTE_COLORS[idx % DEFAULT_ROUTE_COLORS.length];
              return (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => focusRoute(r)}
                  className="w-full flex items-center gap-2 truncate text-left p-1 rounded-md hover:bg-surface-2 transition-colors cursor-pointer group"
                >
                  <span
                    className="w-3 h-1 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-text group-hover:text-accent font-medium truncate text-[11px]">
                    {r.title} {r.distanceKm ? `(${r.distanceKm.toLocaleString()} km)` : ""}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-muted text-[11px] leading-tight">
            8 Solo Expeditions Registered.
          </div>
        )}
      </div>
    </div>
  );
}
