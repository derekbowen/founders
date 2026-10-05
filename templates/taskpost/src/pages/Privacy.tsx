import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { brand } from '../data/brand';
import { legalUpdated, privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`What we collect, why we collect it, and the choices you have when you use ${brand.name}.`}
      updated={legalUpdated}
      sections={privacySections} />);


}