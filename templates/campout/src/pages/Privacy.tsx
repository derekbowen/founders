import React from 'react';
import { LegalDocument } from '../components/LegalDocument';
import { brand } from '../data/brand';
import { privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="September 1, 2026"
      intro={`${brand.name} collects only what we need to run safe, simple bookings — and we never sell your personal data.`}
      sections={privacySections} />);


}