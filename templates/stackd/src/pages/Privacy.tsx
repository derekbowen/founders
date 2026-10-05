import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { brand } from '../data/brand';
import { privacySections } from '../data/legal';

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`${brand.name} collects only what it needs to deliver your files, pay creators and keep the marketplace safe. We never sell your data.`}
      sections={privacySections} />);


}