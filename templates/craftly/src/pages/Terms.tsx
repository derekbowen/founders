import React from 'react';
import { brand } from '../data/brand';
import { termsSections } from '../data/legal';
import { LegalPage } from '../components/legal/LegalPage';

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="September 1, 2026"
      intro={`These Terms explain the rules for buying and selling on ${brand.name}. We’ve tried to keep them short and in plain language.`}
      sections={termsSections} />);


}