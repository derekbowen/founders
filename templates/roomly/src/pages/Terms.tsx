import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { brand } from '../data/brand';
import { termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated="1 September 2026"
      intro={`These terms govern your use of ${brand.name}. By creating an account or using the service you agree to them. Please read them carefully.`}
      sections={termsSections} />);


}