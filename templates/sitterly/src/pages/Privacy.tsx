import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { privacySections } from '../data/legal';
import { brand } from '../data/brand';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="September 1, 2026"
      intro={`Your family’s privacy matters. This policy explains what ${brand.name} collects, why, and the choices you have.`}
      sections={privacySections} />);


}