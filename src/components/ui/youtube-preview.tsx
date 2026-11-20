"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function YouTubePreview({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        className="youtube-preview"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="youtube-preview poster" aria-label={`Play ${title}`} onClick={() => setPlaying(true)}>
      {/* YouTube provides these fixed-size thumbnails on its own CDN. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
      <span><Play size={24} fill="currentColor" aria-hidden="true" /></span>
    </button>
  );
}
