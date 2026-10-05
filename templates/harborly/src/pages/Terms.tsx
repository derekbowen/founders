import React from 'react';
import { LegalDocument } from '../components/LegalDocument';
import { brand } from '../data/brand';
import { legalUpdated, termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalDocument
      title="Terms of Service"
      updated={legalUpdated}
      intro={`Welcome to ${brand.name}. By creating an account or booking a trip you agree to these terms. Please read them carefully — they include important information about safety, insurance and cancellations.`}
      sections={termsSections} />);


}