import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { brand } from '../data/brand';
import { privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="September 1, 2026"
      intro={`This policy explains what personal information ${brand.name} collects, how we use it, and the choices you have.`}
      sections={privacySections} />);


}