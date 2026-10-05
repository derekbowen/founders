import React from 'react';
import { TextField } from '../ui/TextField';
import { TextArea } from '../ui/TextArea';
import { MapView } from '../map/MapView';
import { getDestination } from '../../utils/lookup';
import type { WizardStepProps } from '../../types/listingDraft';

export function MeetingPointStep({ draft, update }: WizardStepProps) {
  const destination = getDestination(draft.destinationId);
  return (
    <div className="space-y-5">
      <TextField label="Place name" value={draft.meetingName} onChange={(e) => update({ meetingName: e.target.value })} placeholder="e.g. Main entrance of Mercado da Ribeira" />
      <TextField label="Street address" value={draft.meetingAddress} onChange={(e) => update({ meetingAddress: e.target.value })} placeholder={`Address in ${destination?.city}`} hint="Shown publicly on your listing" />
      {destination &&
      <MapView
        variant="dot"
        zoom={13}
        markers={[{ id: 'pin', lat: destination.lat, lng: destination.lng }]}
        ariaLabel={`Map preview of ${destination.city}`}
        className="h-64 overflow-hidden rounded-2xl border border-slate-200" />

      }
      <TextArea label="How guests find you" rows={3} value={draft.meetingInstructions} onChange={(e) => update({ meetingInstructions: e.target.value })} placeholder="e.g. Look for me in a coral cap next to the fountain." />
    </div>);

}