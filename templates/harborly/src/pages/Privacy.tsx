import React from 'react';
import { LegalDocument } from '../components/LegalDocument';
import { brand } from '../data/brand';
import { legalUpdated, privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated={legalUpdated}
      intro={`${brand.legalName} respects your privacy. This policy explains what we collect, why, and the choices you have.`}
      sections={privacySections} />);


}