import React from 'react';
import { CoachCta } from '../components/landing/CoachCta';
import { FeaturedClubs } from '../components/landing/FeaturedClubs';
import { HeroSection } from '../components/landing/HeroSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { OpenPlayToday } from '../components/landing/OpenPlayToday';
import { SportsGrid } from '../components/landing/SportsGrid';

export function Landing() {
  return (
    <>
      <HeroSection />
      <SportsGrid />
      <OpenPlayToday />
      <HowItWorks />
      <FeaturedClubs />
      <CoachCta />
    </>);

}