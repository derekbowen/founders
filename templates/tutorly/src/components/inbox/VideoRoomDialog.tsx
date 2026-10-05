import React, { useState } from 'react';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, MonitorUpIcon, PhoneOffIcon, PenToolIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '../Dialog';
import { Avatar } from '../Avatar';
import type { Lesson } from '../../types/marketplace';

interface VideoRoomDialogProps {
  lesson: Lesson;
  isOpen: boolean;
  onClose: () => void;
  selfName: string;
}

export function VideoRoomDialog({ lesson, isOpen, onClose, selfName }: VideoRoomDialogProps) {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const control = (label: string, active: boolean, onClick: () => void, icon: React.ReactNode, danger = false) =>
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={active}
    className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
    danger ? 'bg-red-600 text-white hover:bg-red-700' : active ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-ink-900'}`
    }>
    
      {icon}
    </button>;


  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg">
      <DialogHeader>Video classroom · {lesson.subject} with {lesson.counterpartName}</DialogHeader>
      <DialogContent>
        <div className="rounded-2xl bg-ink-900 p-3">
          <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-ink-800">
              {lesson.counterpartPhoto ?
              <img src={lesson.counterpartPhoto} alt={lesson.counterpartName} className="h-full w-full object-cover object-top" /> :

              <Avatar name={lesson.counterpartName} alt={lesson.counterpartName} size="xl" />
              }
              <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">{lesson.counterpartName}</span>
            </div>
            <div className="grid gap-3">
              <div className="relative flex aspect-video items-center justify-center rounded-xl bg-ink-700">
                {cam ? <Avatar name={selfName} alt={selfName} size="lg" /> : <VideoOffIcon className="text-ink-400" aria-hidden="true" />}
                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">You</span>
              </div>
              <div className="flex aspect-video flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink-600 text-ink-300">
                <PenToolIcon size={18} aria-hidden="true" />
                <span className="text-xs">Shared whiteboard</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            {control(mic ? 'Mute microphone' : 'Unmute microphone', mic, () => setMic((m) => !m), mic ? <MicIcon size={18} /> : <MicOffIcon size={18} />)}
            {control(cam ? 'Turn camera off' : 'Turn camera on', cam, () => setCam((c) => !c), cam ? <VideoIcon size={18} /> : <VideoOffIcon size={18} />)}
            {control('Share screen', true, () => undefined, <MonitorUpIcon size={18} />)}
            {control('Leave lesson', false, onClose, <PhoneOffIcon size={18} />, true)}
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Placeholder classroom — connect a video provider such as Daily, Whereby or Twilio to go live.
        </p>
      </DialogContent>
    </Dialog>);

}