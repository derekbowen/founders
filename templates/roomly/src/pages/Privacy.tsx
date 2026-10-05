import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { brand } from '../data/brand';
import { privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="1 September 2026"
      intro={`Your privacy matters. This policy explains what personal data ${brand.name} collects, why, and the choices you have.`}
      sections={privacySections} />);


}