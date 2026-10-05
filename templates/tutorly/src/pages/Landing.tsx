import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { SubjectsGrid } from '../components/landing/SubjectsGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { TopTutors } from '../components/landing/TopTutors';
import { TrustBand } from '../components/landing/TrustBand';
import { TutorCta } from '../components/landing/TutorCta';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <SubjectsGrid />
      <HowItWorks />
      <TopTutors />
      <TrustBand />
      <TutorCta />
    </>);

}