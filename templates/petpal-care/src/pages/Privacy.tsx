import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { privacySections, privacyUpdated } from '../data/legal';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={privacyUpdated}
      intro="Your trust matters. This policy explains what information {brand} collects, how we use it and the choices you have."
      sections={privacySections} />);


}