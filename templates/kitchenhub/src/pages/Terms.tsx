import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { brand } from '../data/brand';
import { legalUpdated, termsSections } from '../data/legal';

export function TermsPage() {
  return (
    <LegalDocument
      title="Terms of service"
      updated={legalUpdated}
      intro={`The rules for booking and hosting commercial kitchens on ${brand.name}.`}
      sections={termsSections} />);


}