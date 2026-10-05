import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { termsSections, termsUpdated } from '../data/legal';

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={termsUpdated}
      intro="These terms govern your use of {brand}, including searching for sitters, booking services, listing your own services and getting paid."
      sections={termsSections} />);


}