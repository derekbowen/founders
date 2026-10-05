import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CategoryGrid } from '../components/landing/CategoryGrid';
import { RecentJobs } from '../components/landing/RecentJobs';
import { TrustBand } from '../components/landing/TrustBand';
import { CtaBand } from '../components/landing/CtaBand';

export function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CategoryGrid />
      <RecentJobs />
      <TrustBand />
      <CtaBand />
    </>);

}