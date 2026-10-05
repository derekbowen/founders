import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { brand } from '../data/brand';
import { termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated="September 1, 2026"
      intro={`These terms govern your use of ${brand.name}, operated by ${brand.legalEntity}. By creating an account or making a booking, you agree to them.`}
      sections={termsSections} />);


}