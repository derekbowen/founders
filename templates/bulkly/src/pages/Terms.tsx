import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { brand } from '../data/brand';
import { termsSections, termsUpdated } from '../data/legal';

export function Terms() {
  return (
    <LegalDocument
      title="Terms of Service"
      updated={termsUpdated}
      intro={`Welcome to ${brand.name}. These terms explain the rules for buying and selling wholesale on our marketplace. Please read them carefully.`}
      sections={termsSections} />);


}