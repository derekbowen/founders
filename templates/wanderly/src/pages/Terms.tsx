import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { termsSections } from '../data/legal';
import { brand } from '../data/brand';

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms govern your use of ${brand.name}, whether you're booking an experience as a guest or hosting one. Please read them carefully.`}
      sections={termsSections} />);


}