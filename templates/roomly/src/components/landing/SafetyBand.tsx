import React from 'react';
import { FileTextIcon, MessageCircleIcon, ShieldCheckIcon, TriangleAlertIcon } from 'lucide-react';
import { safetyTips } from '../../data/discover';

const icons = [
<ShieldCheckIcon key="a" size={20} />,
<MessageCircleIcon key="b" size={20} />,
<FileTextIcon key="c" size={20} />,
<TriangleAlertIcon key="d" size={20} />];


export function SafetyBand() {
  return (
    <section className="bg-navy-900" aria-labelledby="safety-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <span className="inline-flex rounded-full bg-coral-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Renter safety
          </span>
          <h2 id="safety-heading" className="mt-4 text-3xl font-bold tracking-tight text-white">
            Rent smart, stay safe
          </h2>
          <p className="mt-3 text-navy-200">
            Our Trust &amp; Safety team reviews every listing, but a few simple habits keep you protected.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {safetyTips.map((tip, i) =>
          <li key={tip.title} className="flex gap-4 rounded-2xl bg-navy-800 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-400 text-navy-900">
                {icons[i]}
              </span>
              <div>
                <h3 className="font-semibold text-white">{tip.title}</h3>
                <p className="mt-1 text-sm text-navy-200">{tip.text}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}