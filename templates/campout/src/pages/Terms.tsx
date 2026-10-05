import React from 'react';
import { LegalDocument } from '../components/LegalDocument';
import { brand } from '../data/brand';
import { termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalDocument
      title="Terms of service"
      updated="September 1, 2026"
      intro={`These terms govern your use of ${brand.name}, whether you’re booking a night under the stars or hosting campers on your land.`}
      sections={termsSections} />);


}