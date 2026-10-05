import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { termsSections, termsUpdated } from '../data/legal';

export function Terms() {
  return <LegalPage title="Terms of service" updated={termsUpdated} sections={termsSections} current="terms" />;
}