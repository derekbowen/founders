import React from 'react';
import { LegalDocument } from '../components/legal/LegalDocument';
import { termsSections } from '../data/legal';
import { brand } from '../data/brand';

export function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      updated="September 1, 2026"
      intro={`Welcome to ${brand.name}. Please read these terms carefully — they explain how bookings, payments and cancellations work for learners, parents and tutors.`}
      sections={termsSections} />);


}