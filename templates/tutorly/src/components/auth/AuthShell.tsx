import React from 'react';
import { BadgeCheckIcon, HeartHandshakeIcon, VideoIcon } from 'lucide-react';
import { brand } from '../../data/brand';

const points = [
{ icon: BadgeCheckIcon, text: 'Vetted tutors with verified credentials' },
{ icon: HeartHandshakeIcon, text: 'First lesson guarantee' },
{ icon: VideoIcon, text: 'Built-in video classroom & lesson notes' }];


export function AuthShell({ title, subtitle, children }: {title: string;subtitle: string;children: React.ReactNode;}) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] bg-white lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{title}</h1>
          <p className="mt-2 text-ink-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <aside className="relative hidden overflow-hidden bg-primary-600 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-300" aria-hidden="true" />
        <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-primary-500" aria-hidden="true" />
        <div className="relative max-w-md">
          <p className="text-3xl font-semibold leading-tight">"My son's confidence in math has completely changed."</p>
          <p className="mt-4 text-primary-100">— Jennifer L., parent on {brand.name}</p>
          <ul className="mt-10 space-y-4">
            {points.map((p) =>
            <li key={p.text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  <p.icon size={18} aria-hidden="true" />
                </span>
                {p.text}
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>);

}