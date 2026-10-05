import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { privacySections, privacyUpdated } from '../data/legal';
import { brand } from '../data/brand';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={privacyUpdated}
      intro={`Your privacy matters. This policy explains what information ${brand.name} collects, how we use it, and the choices you have.`}
      sections={privacySections} />);


}