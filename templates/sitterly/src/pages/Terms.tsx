import React from 'react';
import { LegalPage } from '../components/LegalPage';
import { termsSections } from '../data/legal';
import { brand } from '../data/brand';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated="September 1, 2026"
      intro={`These terms govern your use of ${brand.name}. By creating an account or booking a sitter, you agree to them.`}
      sections={termsSections} />);


}