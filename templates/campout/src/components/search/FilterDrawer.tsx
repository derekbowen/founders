import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { amenities, searchAmenityFilters, vehicleLengthOptions } from '../../data/amenities';
import { siteTypes } from '../../data/siteTypes';
import { listings } from '../../data/listings';
import type { SearchFilters } from '../../types/search';
import type { SiteType } from '../../types/listing';
import { PRICE_MAX, PRICE_MIN, emptyFilters, filterListings } from '../../utils/search';

interface FilterDrawerProps {
  open: boolean;
  filters: SearchFilters;
  onClose: () => void;
  onApply: (f: SearchFilters) => void;
}

export function FilterDrawer({ open, filters, onClose, onApply }: FilterDrawerProps) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const resultCount = filterListings(listings, draft).length;
  const toggleType = (t: SiteType) =>
  setDraft((d) => ({ ...d, siteTypes: d.siteTypes.includes(t) ? d.siteTypes.filter((x) => x !== t) : [...d.siteTypes, t] }));

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="filters-title">
          <motion.div
          className="absolute inset-0 bg-ink-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} />
        
          <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          className="relative flex h-full w-full max-w-md flex-col bg-white shadow-lift">
          
            <header className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
              <h2 id="filters-title" className="text-xl font-bold">
                Filters
              </h2>
              <button type="button" onClick={onClose} className="btn-ghost px-2" aria-label="Close filters">
                <XIcon size={20} />
              </button>
            </header>
            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
              <fieldset>
                <legend className="font-serif text-lg font-bold text-ink-900">Site type</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {siteTypes.map((t) => {
                  const active = draft.siteTypes.includes(t.key);
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleType(t.key)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                      active ? 'border-primary-700 bg-primary-50 text-primary-800' : 'border-sand-300 text-ink-700 hover:border-ink-400'}`
                      }>
                      
                        <Icon size={18} aria-hidden="true" />
                        {t.label}
                      </button>);

                })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-serif text-lg font-bold text-ink-900">Price per night</legend>
                <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={5}
                value={draft.maxPrice}
                onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Math.max(Number(e.target.value), d.minPrice) }))}
                className="mt-4 w-full accent-primary-700"
                aria-label="Maximum price" />
              
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label>
                    <span className="label">Minimum</span>
                    <input
                    type="number"
                    className="input"
                    min={PRICE_MIN}
                    max={draft.maxPrice}
                    value={draft.minPrice}
                    onChange={(e) => setDraft((d) => ({ ...d, minPrice: Number(e.target.value) || 0 }))} />
                  
                  </label>
                  <label>
                    <span className="label">Maximum</span>
                    <input
                    type="number"
                    className="input"
                    min={draft.minPrice}
                    max={PRICE_MAX}
                    value={draft.maxPrice}
                    onChange={(e) => setDraft((d) => ({ ...d, maxPrice: Number(e.target.value) || PRICE_MAX }))} />
                  
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-serif text-lg font-bold text-ink-900">Amenities & essentials</legend>
                <div className="mt-3 space-y-3">
                  {searchAmenityFilters.map((key) => {
                  const a = amenities.find((x) => x.key === key);
                  if (!a) return null;
                  const checked = draft.amenities.includes(key);
                  return (
                    <Checkbox
                      key={key}
                      label={a.label}
                      checked={checked}
                      onChange={() =>
                      setDraft((d) => ({
                        ...d,
                        amenities: checked ? d.amenities.filter((x) => x !== key) : [...d.amenities, key]
                      }))
                      } />);


                })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-serif text-lg font-bold text-ink-900">Max vehicle length</legend>
                <p className="mt-1 text-sm text-ink-500">Show sites that fit your RV or trailer.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicleLengthOptions.map((o) =>
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={draft.vehicleLength === o.value}
                  onClick={() => setDraft((d) => ({ ...d, vehicleLength: o.value }))}
                  className={`chip ${draft.vehicleLength === o.value ? 'chip-active' : ''}`}>
                  
                      {o.label}
                    </button>
                )}
                </div>
              </fieldset>
            </div>
            <footer className="flex items-center justify-between gap-3 border-t border-sand-200 px-6 py-4">
              <button
              type="button"
              className="text-sm font-semibold text-ink-700 underline underline-offset-4 hover:text-ink-900"
              onClick={() =>
              setDraft((d) => ({ ...emptyFilters, location: d.location, start: d.start, end: d.end, campers: d.campers, sort: d.sort }))
              }>
              
                Clear all
              </button>
              <button type="button" className="btn-primary btn-lg" onClick={() => onApply(draft)} disabled={resultCount === 0}>
                {resultCount === 0 ? 'No matching sites' : `Show ${resultCount} ${resultCount === 1 ? 'site' : 'sites'}`}
              </button>
            </footer>
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}