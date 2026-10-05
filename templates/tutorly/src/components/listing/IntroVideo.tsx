import React, { useState } from 'react';
import { PlayIcon, VideoIcon } from 'lucide-react';

const VIDEO_POSTER = "/1fb136e0-841d-4ab7-9cb6-f76796392330.jpg";


export function IntroVideo({ tutorName, photo }: {tutorName: string;photo?: string;}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-3xl bg-ink-900 p-6 text-center text-white">
        <VideoIcon size={32} className="text-accent-300" aria-hidden="true" />
        <p className="font-semibold">Intro video placeholder</p>
        <p className="max-w-sm text-sm text-ink-300">
          Connect your video host (YouTube, Vimeo or Mux) to stream {tutorName}'s introduction here.
        </p>
        <div className="mt-2 h-1.5 w-2/3 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/3 rounded-full bg-accent-400" />
        </div>
        <button type="button" onClick={() => setPlaying(false)} className="mt-2 text-sm font-medium text-primary-200 underline-offset-2 hover:underline">
          Close video
        </button>
      </div>);

  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
      aria-label={`Play ${tutorName}'s intro video`}>
      
      <img
        src={photo ?? VIDEO_POSTER}
        alt=""
        className="h-full w-full object-cover object-[50%_25%] transition duration-500 group-hover:scale-[1.02]" />
      
      <span className="absolute inset-0 bg-ink-900/25" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-400 text-ink-900 shadow-lift transition group-hover:scale-110">
        <PlayIcon size={26} className="ml-1 fill-ink-900" aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-ink-900">
        Meet {tutorName} · 1:24
      </span>
    </button>);

}