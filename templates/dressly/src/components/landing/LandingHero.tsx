import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { occasions, sizes } from '../../data/taxonomy';
import { btn, eyebrow } from '../../utils/styles';

export function LandingHero() {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState('');
  const [size, setSize] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (occasion) params.set('occasion', occasion);
    if (size) params.set('size', size);
    navigate(`/s${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}>
          
          <p className={eyebrow}>Designer rental · closet to closet</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Wear the dress,
            <br />
            <em className="font-normal text-accent-dark">skip the</em> price tag.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Rent designer gowns and occasion dresses from real closets near you. 4 or 8 days,
            professional cleaning included, shipped to your door or picked up locally.
          </p>

          <form
            onSubmit={submit}
            className="mt-9 grid max-w-xl gap-px overflow-hidden border border-ink bg-ink sm:grid-cols-[1fr_1fr_auto]">
            
            <label className="flex flex-col bg-paper px-4 py-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-muted">
                Occasion
              </span>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="mt-0.5 bg-transparent text-sm text-ink focus:outline-none">
                
                <option value="">Any occasion</option>
                {occasions.map((o) =>
                <option key={o.slug} value={o.slug}>
                    {o.label}
                  </option>
                )}
              </select>
            </label>
            <label className="flex flex-col bg-paper px-4 py-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-muted">
                Your size
              </span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-0.5 bg-transparent text-sm text-ink focus:outline-none">
                
                <option value="">Any size</option>
                {sizes.map((s) =>
                <option key={s} value={s}>
                    US {s}
                  </option>
                )}
              </select>
            </label>
            <button type="submit" className={btn('primary', 'lg', 'h-auto rounded-none py-4')}>
              Find a dress <ArrowRightIcon size={14} aria-hidden="true" />
            </button>
          </form>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
            ['12k+', 'Designer pieces'],
            ['85%', 'Off retail, avg.'],
            ['4.9', 'Renter rating']].
            map(([value, label]) =>
            <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl text-ink">{value}</dd>
                <dd className="mt-1 text-xs text-muted">{label}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none">
          
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={brand.images.hero}
              alt="Woman wearing a dusty-rose silk slip gown in a sunlit apartment"
              className="h-full w-full object-cover" />
            
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 bg-paper px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] sm:left-[-1.5rem]">
            <SparklesIcon size={18} className="text-accent-dark" aria-hidden="true" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-muted">
                Silk slip gown
              </p>
              <p className="text-sm text-ink">
                Rented for <strong>$49</strong>{' '}
                <span className="text-muted line-through">$560</span>
              </p>
            </div>
          </div>
          <p className="absolute right-0 top-4 hidden origin-top-right translate-x-full rotate-90 text-[10px] uppercase tracking-eyebrow text-muted xl:block">
            Autumn / Winter edit
          </p>
        </motion.div>
      </div>
    </section>);

}