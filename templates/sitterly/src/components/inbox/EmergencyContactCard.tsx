import React from 'react';
import { PhoneIcon, SirenIcon } from 'lucide-react';

interface EmergencyContactCardProps {
  contact: {name: string;relation: string;phone: string;};
}

export function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  return (
    <section aria-labelledby="emergency-heading" className="rounded-3xl border border-accent-200 bg-accent-50 p-5">
      <div className="flex items-center gap-2">
        <SirenIcon className="h-5 w-5 text-accent-700" aria-hidden />
        <h2 id="emergency-heading" className="font-heading text-lg font-bold text-ink-900">Emergency contact</h2>
      </div>
      <p className="mt-3 font-semibold text-ink-900">{contact.name}</p>
      <p className="text-sm text-ink-700">{contact.relation}</p>
      <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-800 ring-1 ring-accent-200 hover:bg-accent-100">
        <PhoneIcon className="h-4 w-4" aria-hidden /> {contact.phone}
      </a>
      <p className="mt-4 text-xs leading-relaxed text-ink-700">
        In a medical emergency, call <strong>911</strong> first, then the parent and this contact. Our 24/7 safety line is always available.
      </p>
    </section>);

}