import React from 'react';
import { brand } from '../data/brand';
import { privacySections } from '../data/legal';
import { LegalPage } from '../components/legal/LegalPage';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 1, 2026"
      intro={`Your trust matters to ${brand.name} and to every maker here. This policy describes what we collect, why, and the choices you have.`}
      sections={privacySections} />);


}