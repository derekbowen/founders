import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { privacySections, privacyUpdated } from '../data/legal';

export function Privacy() {
  return <LegalPage title="Privacy policy" updated={privacyUpdated} sections={privacySections} current="privacy" />;
}