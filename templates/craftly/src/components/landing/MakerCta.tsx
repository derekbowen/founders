import React from 'react';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { useAuth } from '../../contexts/AuthContext';
import { ButtonLink } from '../ui/ButtonLink';

const STUDIO = "/9592bb15-f0db-4321-a3ca-2e893202f7bd.jpg";

export function MakerCta() {
  const { user } = useAuth();
  const perks = [
  'No listing fees — list as many pieces as you make',
  `A flat ${brand.marketplaceFeePercent}% fee only when something sells`,
  'Offer shipping, local pickup, or both',
  'Weekly payouts straight to your bank'];

  return (
    <section className="container-page py-20">
      <div className="grid overflow-hidden rounded-[2rem] bg-primary-soft lg:grid-cols-2">
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="eyebrow !text-primary-ink">For makers</p>
          <h2 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            Your craft deserves a <em className="italic text-primary">good home</em>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Open a {brand.name} shop in an afternoon. We handle payments, buyer protection and discovery so you can stay at the bench.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((p) =>
            <li key={p} className="flex items-start gap-3 text-sm text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <CheckIcon className="h-3 w-3" aria-hidden />
                </span>
                {p}
              </li>
            )}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to={user ? '/listings/new' : '/signup'} size="lg">
              Open a shop
            </ButtonLink>
            <ButtonLink to="/about" variant="ghost" size="lg">
              How selling works
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[320px]">
          <img src={STUDIO} alt="A woodworker sanding a walnut board in his workshop" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>);

}