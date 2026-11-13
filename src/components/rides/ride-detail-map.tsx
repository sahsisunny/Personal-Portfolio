"use client";

import * as React from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layers, MapPin, RotateCcw } from "lucide-react";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

interface RideDetailMapProps {
  slug: string;
  title: string;
  coordinates?: [number, number][]; // [latitude, longitude]
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

export default function RideDetailMap({
  slug,
  title,
  coordinates = [],
}: RideDetailMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<maplibregl.Marker[]>([]);
  const isReadyRef = React.useRef<boolean>(false);
  const [selectedLayer, setSelectedLayer] = React.useState<MapLayerType>("dark");

  const routeColor = React.useMemo(() => {
    if (slug.includes("ladakh")) return "#ea580c";
    if (slug.includes("rameshwaram")) return "#0284c7";
    if (slug.includes("kolli")) return "#10b981";
    if (slug.includes("nandi")) return "#a855f7";
    if (slug.includes("bangalore")) return "#06b6d4";
    return "#f59e0b";
  }, [slug]);

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

  const renderRouteAndMarkers = React.useCallback(
    (map: maplibregl.Map) => {
      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (!coordinates || coordinates.length === 0) return;

      // Convert [lat, lng] to GeoJSON [lng, lat]
      const geojsonCoords: [number, number][] = coordinates.map((c) => [c[1], c[0]]);

      const sourceId = `detail-route-${slug}`;
      const casingLayerId = `detail-layer-${slug}-casing`;
      const lineLayerId = `detail-layer-${slug}-line`;

      const featureData: GeoJSON.Feature<GeoJSON.LineString> = {
        type: "Feature",
        properties: { title },
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

      // Dark casing
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

      // Vibrant path
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
            "line-color": routeColor,
            "line-width": 4,
            "line-opacity": 0.95,
          },
        });
      }

      // Start Marker (Origin)
      const startCoord = geojsonCoords[0];
      const startEl = document.createElement("div");
      startEl.style.width = "14px";
      startEl.style.height = "14px";
      startEl.style.borderRadius = "50%";
      startEl.style.backgroundColor = "#10b981";
      startEl.style.border = "2px solid #ffffff";
      startEl.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.9)";
      startEl.style.cursor = "pointer";

      const startMarker = new maplibregl.Marker({ element: startEl })
        .setLngLat(startCoord)
        .setPopup(
          new maplibregl.Popup({ offset: 12, closeButton: false }).setHTML(
            `<div class="p-1 font-mono text-xs"><b>Expedition Departure</b><br/>${title}</div>`
          )
        )
        .addTo(map);
      markersRef.current.push(startMarker);

      // End Marker (Destination)
      if (geojsonCoords.length > 1) {
        const endCoord = geojsonCoords[geojsonCoords.length - 1];
        const endEl = document.createElement("div");
        endEl.style.width = "16px";
        endEl.style.height = "16px";
        endEl.style.borderRadius = "50%";
        endEl.style.backgroundColor = "#e11d48";
        endEl.style.border = "2.5px solid #ffffff";
        endEl.style.boxShadow = "0 0 12px rgba(225, 29, 72, 0.9)";
        endEl.style.cursor = "pointer";

        const endMarker = new maplibregl.Marker({ element: endEl })
          .setLngLat(endCoord)
          .setPopup(
            new maplibregl.Popup({ offset: 12, closeButton: false }).setHTML(
              `<div class="p-1 font-mono text-xs"><b>Expedition Destination</b><br/>${title}</div>`
            )
          )
          .addTo(map);
        markersRef.current.push(endMarker);
      }
    },
    [coordinates, slug, title, routeColor]
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
        renderRouteAndMarkers(map);
        map.resize();
      };

      // Attach listener BEFORE setStyle
      map.once("style.load", onStyleReady);
      map.setStyle(TILE_PROVIDERS[type].style);
    },
    [enhanceContrast, renderRouteAndMarkers]
  );

  const resetView = React.useCallback(() => {
    if (!mapInstance.current) return;
    if (coordinates && coordinates.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      coordinates.forEach((c) => bounds.extend([c[1], c[0]]));
      mapInstance.current.fitBounds(bounds, { padding: 50, maxZoom: 12, duration: 1000 });
    } else if (coordinates && coordinates.length === 1) {
      mapInstance.current.flyTo({
        center: [coordinates[0][1], coordinates[0][0]],
        zoom: 8,
        duration: 1000,
      });
    } else {
      mapInstance.current.flyTo({ center: [78.9629, 22.5937], zoom: 6, duration: 1000 });
    }
  }, [coordinates]);

  // Initialize MapLibre ONCE on mount
  React.useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    const initialCenter: [number, number] =
      coordinates && coordinates.length > 0
        ? [coordinates[0][1], coordinates[0][0]]
        : [78.9629, 22.5937];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: OPENFREEMAP_DARK_STYLE,
      center: initialCenter,
      zoom: 6,
      scrollZoom: false,
      attributionControl: { compact: true },
    });

    mapInstance.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

    const setupMap = () => {
      if (!isMounted || isReadyRef.current) return;
      isReadyRef.current = true;

      enhanceContrast(map);
      renderRouteAndMarkers(map);
      map.resize();

      if (coordinates && coordinates.length > 1) {
        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach((c) => bounds.extend([c[1], c[0]]));
        map.fitBounds(bounds, { padding: 50, maxZoom: 12 });
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

  // Update route if coordinates change
  React.useEffect(() => {
    if (mapInstance.current && isReadyRef.current) {
      renderRouteAndMarkers(mapInstance.current);
    }
  }, [renderRouteAndMarkers]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-[#111822]">
      <div ref={mapContainerRef} className="w-full h-[400px] sm:h-[500px]" />

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

        {/* Reset View Button */}
        <button
          type="button"
          onClick={resetView}
          title="Reset map view to route overview"
          className="flex items-center gap-1.5 px-3 py-1 bg-surface/90 backdrop-blur-md border border-border hover:border-accent text-muted hover:text-text rounded-xl shadow-lg text-xs font-mono font-medium transition-all cursor-pointer hover:bg-surface-2 group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-accent group-hover:-rotate-45 transition-transform duration-300" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Route Badge */}
      <div className="absolute bottom-3 left-3 z-10 bg-surface/90 backdrop-blur-md border border-border rounded-xl p-2.5 px-3 text-xs font-mono shadow-lg flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-accent" />
        <span className="font-bold text-text">
          {title} {coordinates.length > 0 ? `(${coordinates.length} GPS Points)` : "• No GPS Telemetry"}
        </span>
        <button
          type="button"
          onClick={resetView}
          className="ml-2 pl-2 border-l border-border/80 text-[10px] text-accent hover:underline flex items-center gap-1 cursor-pointer font-medium"
          title="Recenter route overview"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Recenter</span>
        </button>
      </div>
    </div>
  );
}
