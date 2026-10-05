import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { termsSections, termsUpdated } from '../data/legal';
import { brand } from '../data/brand';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated={termsUpdated}
      intro={`These Terms govern your use of ${brand.name}, operated by ${brand.legalEntity}. Please read them carefully — they explain how quotes, offers, payments and deliveries work.`}
      sections={termsSections} />);


}