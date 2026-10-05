import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { SpaceTypesSection } from '../components/landing/SpaceTypesSection';
import { PopularCities } from '../components/landing/PopularCities';
import { FeaturedSpaces } from '../components/landing/FeaturedSpaces';
import { TeamPlans } from '../components/landing/TeamPlans';
import { HostCta } from '../components/landing/HostCta';

export function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SpaceTypesSection />
      <PopularCities />
      <FeaturedSpaces />
      <TeamPlans />
      <HostCta />
    </>);

}