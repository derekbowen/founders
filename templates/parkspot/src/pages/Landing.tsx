import React from 'react';
import { Hero } from '../components/landing/Hero';
import { UseCases } from '../components/landing/UseCases';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FeaturedSpots } from '../components/landing/FeaturedSpots';
import { HostCta } from '../components/landing/HostCta';

export function Landing() {
  return (
    <div className="w-full bg-canvas">
      <Hero />
      <UseCases />
      <HowItWorks />
      <FeaturedSpots />
      <HostCta />
    </div>);

}