import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { sitterCtaImage, sitterPerks } from '../../data/landing';

export function SitterCta() {
  return (
    <section className="container-page py-16 lg:py-24" aria-labelledby="sitter-cta-heading">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-primary-100 lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="eyebrow">Become a sitter</p>
          <h2 id="sitter-cta-heading" className="mt-2 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">
            Get paid to hang out with pets
          </h2>
          <p className="mt-4 text-ink-700">Turn your love of animals into flexible income. Most sitters earn $800+ a month caring for pets in their neighborhood.</p>
          <ul className="mt-6 space-y-3">
            {sitterPerks.map((p) =>
            <li key={p} className="flex items-start gap-2.5 font-semibold text-ink-800">
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
                {p}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/create-listing" className="btn btn-lg btn-primary">
              Create your listing
            </Link>
            <Link to="/about" className="btn btn-lg btn-secondary">
              Learn more
            </Link>
          </div>
        </div>
        <img src={sitterCtaImage} alt="A sitter hugging a happy beagle in a backyard" className="h-72 w-full object-cover lg:h-full" />
      </div>
    </section>);

}