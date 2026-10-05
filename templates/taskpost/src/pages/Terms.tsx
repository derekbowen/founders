import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { brand } from '../data/brand';
import { legalUpdated, termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`The rules that keep ${brand.name} fair and safe for customers and pros.`}
      updated={legalUpdated}
      sections={termsSections} />);


}