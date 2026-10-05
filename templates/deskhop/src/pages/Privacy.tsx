import React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { privacySections } from '../data/legal';

export function Privacy() {
  return <LegalPage title="Privacy policy" updated="1 September 2026" sections={privacySections} />;
}