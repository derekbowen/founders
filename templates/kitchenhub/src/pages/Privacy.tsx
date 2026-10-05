import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { brand } from '../data/brand';
import { legalUpdated, privacySections } from '../data/legal';

export function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated={legalUpdated}
      intro={`How ${brand.name} collects, uses and protects your information.`}
      sections={privacySections} />);


}