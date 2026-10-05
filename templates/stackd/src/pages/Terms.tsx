import React from 'react';
import { LegalPage } from '../components/common/LegalPage';
import { brand } from '../data/brand';
import { termsSections } from '../data/legal';

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      intro={`These terms explain how buying and selling digital products on ${brand.name} works. The short version: creators own their work, buyers get a license, and everyone plays fair.`}
      sections={termsSections} />);


}