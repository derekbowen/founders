import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { termsSections, privacySections, termsUpdated, privacyUpdated } from '../data/legal';

export function Terms() {
  return <LegalPage title="Terms of Service" updated={termsUpdated} sections={termsSections} />;
}

export function Privacy() {
  return <LegalPage title="Privacy Policy" updated={privacyUpdated} sections={privacySections} />;
}