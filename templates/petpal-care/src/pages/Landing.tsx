import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TopSitters } from '../components/landing/TopSitters';
import { SafetyBand } from '../components/landing/SafetyBand';
import { SitterCta } from '../components/landing/SitterCta';

export function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TopSitters />
      <SafetyBand />
      <SitterCta />
    </>);

}