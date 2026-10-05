import React from 'react';
import { LegalPage } from '../components/legal/LegalPage';
import { termsSections } from '../data/legal';

export function Terms() {
  return <LegalPage title="Terms of service" updated="1 September 2026" sections={termsSections} />;
}