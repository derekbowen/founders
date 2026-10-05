import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { brand } from '../data/brand';
import { privacyUpdated, privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated={privacyUpdated}
      intro={`This policy describes how ${brand.legalName} collects, uses and protects information about the businesses and people who use ${brand.name}.`}
      sections={privacySections} />);


}