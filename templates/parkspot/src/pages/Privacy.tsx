import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { privacySections } from '../data/legal';
import { brand } from '../data/brand';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`This policy explains what information ${brand.name} collects, how we use it, and the choices you have.`}
      sections={privacySections} />);


}