"use client";

import * as React from "react";
import { Play } from "lucide-react";

interface YoutubeFacadeProps {
  id: string;
  title: string;
}

export function YoutubeFacade({ id, title }: YoutubeFacadeProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-border">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-stone-900 cursor-pointer shadow-lg hover:border-accent transition-all duration-200"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsPlaying(true);
        }
      }}
      aria-label={`Play video: ${title}`}
    >
      {/* Fallback visual gradient / poster representation */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
        <span className="text-xs font-mono uppercase text-accent font-semibold tracking-wider mb-1">
          Ride Footage
        </span>
        <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1">{title}</h4>
      </div>

      {/* Play button pill */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-2xl group-hover:scale-110 transition-transform">
          <Play className="w-7 h-7 fill-current ml-1" />
        </div>
      </div>
    </div>
  );
}
