import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { termsSections } from '../data/legal';
import { brand } from '../data/brand';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      intro={`These terms govern your use of ${brand.name}. By creating an account or booking a space, you agree to them.`}
      sections={termsSections} />);


}