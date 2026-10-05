import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { hostSteps } from '../../data/marketing';
import { images } from '../../data/images';
import { brand } from '../../data/brand';

export function HostCta() {
  return (
    <section className="overflow-hidden rounded-3xl bg-accent-800 text-white" aria-labelledby="host-cta-title">
      <div className="grid lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-200">Become a host</p>
          <h2 id="host-cta-title" className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Know your city? Share it — and earn.
          </h2>
          <p className="mt-4 max-w-md text-base text-accent-100">
            Hosts on {brand.name} earn an average of $1,850/month showing travelers the places they love.
          </p>
          <ul className="mt-8 space-y-5">
            {hostSteps.map(({ icon: Icon, title, text }) =>
            <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-accent-100">{text}</p>
                </div>
              </li>
            )}
          </ul>
          <Button to="/host/new/details" size="lg" className="mt-9" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            Host an experience
          </Button>
        </div>
        <div className="relative min-h-[280px]">
          <img src={images.hostCta} alt="A local host leading a walking tour" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>);

}