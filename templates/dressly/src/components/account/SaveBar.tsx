import React from 'react';
import { CheckIcon } from 'lucide-react';
import { btn } from '../../utils/styles';

interface SaveBarProps {
  saved: boolean;
  saving: boolean;
  label?: string;
}

export function SaveBar({ saved, saving, label = 'Save changes' }: SaveBarProps) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-6">
      <button type="submit" disabled={saving} className={btn('primary', 'md')}>
        {saving ? 'Saving…' : label}
      </button>
      {saved &&
      <p role="status" className="flex items-center gap-1.5 text-sm text-[#2f5a3f]">
          <CheckIcon size={14} aria-hidden="true" /> Saved
        </p>
      }
    </div>);

}

export function useSaveState() {
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const save = (valid = true) => {
    if (!valid) return;
    setSaved(false);
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  };
  return { saving, saved, save };
}