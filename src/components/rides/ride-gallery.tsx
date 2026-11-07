"use client";

import * as React from "react";
import { X, ChevronLeft, ChevronRight, Camera, Maximize2 } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface RideGalleryProps {
  items: GalleryItem[];
}

export function RideGallery({ items }: RideGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  // Fallback demo photos if gallery is empty
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            src: "/images/rides/ladakh/pass.jpg",
            alt: "Riding across the Himalayan high pass",
            caption: "Climbing through early morning mist above 4,000 meters.",
          },
          {
            src: "/images/rides/ladakh/camp.jpg",
            alt: "Cold start at camp",
            caption: "Sub-zero morning prep at Sarchu campsite.",
          },
          {
            src: "/images/rides/ladakh/valley.jpg",
            alt: "Wide expanse of the valley",
            caption: "Vast windswept plains of More Plains.",
          },
          {
            src: "/images/rides/ladakh/bike.jpg",
            alt: "Motorcycle loaded for long haul",
            caption: "Fully loaded solo touring setup on the gravel tracks.",
          },
        ];

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : displayItems.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev! < displayItems.length - 1 ? prev! + 1 : 0));
      }
    },
    [selectedIndex, displayItems.length]
  );

  React.useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleKeyDown]);

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {displayItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-4/3 rounded-xl overflow-hidden border border-border bg-surface-2 cursor-pointer shadow-xs hover:border-accent transition-all duration-200"
          >
            {/* Visual gradient placeholder representation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <Camera className="w-5 h-5 text-accent mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium line-clamp-1">{item.alt}</p>
              {item.caption && (
                <p className="text-[10px] text-stone-300 line-clamp-1">{item.caption}</p>
              )}
            </div>

            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : displayItems.length - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev! < displayItems.length - 1 ? prev! + 1 : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Content */}
          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative aspect-16/10 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center p-8 text-stone-300">
              <div className="text-center space-y-2">
                <Camera className="w-12 h-12 text-accent mx-auto" />
                <h4 className="text-xl font-bold text-white">
                  {displayItems[selectedIndex].alt}
                </h4>
                {displayItems[selectedIndex].caption && (
                  <p className="text-sm text-stone-400 max-w-lg mx-auto">
                    {displayItems[selectedIndex].caption}
                  </p>
                )}
                <span className="text-xs font-mono text-stone-500 block pt-2">
                  Photo {selectedIndex + 1} of {displayItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

