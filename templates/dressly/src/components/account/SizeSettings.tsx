import React, { useState } from 'react';
import { Input } from '../Input';
import { sizes } from '../../data/taxonomy';
import { labelClass } from '../../utils/styles';
import { ChipToggle } from '../wizard/ChipToggle';
import { SaveBar, useSaveState } from './SaveBar';

export function SizeSettings() {
  const [usual, setUsual] = useState<number[]>([4]);
  const [m, setM] = useState({ height: '5′7″', bust: '33', waist: '26', hips: '36' });
  const { saving, saved, save } = useSaveState();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        save(usual.length > 0);
      }}>
      
      <p className="text-sm text-muted">
        We use your sizes to pre-filter search and power the size check on every listing.
      </p>
      <fieldset>
        <legend className={labelClass}>Sizes you usually wear (US)</legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {sizes.map((s) =>
          <ChipToggle
            key={s}
            className="px-0"
            active={usual.includes(s)}
            onClick={() => setUsual(usual.includes(s) ? usual.filter((x) => x !== s) : [...usual, s])}>
            
              {s}
            </ChipToggle>
          )}
        </div>
        {usual.length === 0 && <p className="mt-2 text-xs text-[#9b2c2c]">Pick at least one size.</p>}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="sz-height" label="Height" value={m.height} onChange={(e) => setM({ ...m, height: e.target.value })} />
        <Input id="sz-bust" label="Bust (in)" inputMode="decimal" value={m.bust} onChange={(e) => setM({ ...m, bust: e.target.value })} />
        <Input id="sz-waist" label="Waist (in)" inputMode="decimal" value={m.waist} onChange={(e) => setM({ ...m, waist: e.target.value })} />
        <Input id="sz-hips" label="Hips (in)" inputMode="decimal" value={m.hips} onChange={(e) => setM({ ...m, hips: e.target.value })} />
      </div>
      <SaveBar saving={saving} saved={saved} label="Save sizes" />
    </form>);

}