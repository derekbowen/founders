import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { privacySections } from '../data/legal';
import { brand } from '../data/brand';

export function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="September 1, 2026"
      intro={`Your privacy — and your children's — matters. This policy explains what ${brand.name} collects, why, and the choices you have.`}
      sections={privacySections} />);


}