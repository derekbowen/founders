import React from 'react';
import { Hero } from '../components/landing/Hero';
import { CategoryTiles } from '../components/landing/CategoryTiles';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FeaturedFreelancers } from '../components/landing/FeaturedFreelancers';
import { ClientLogos } from '../components/landing/ClientLogos';
import { FreelancerCta } from '../components/landing/FreelancerCta';

export function Landing() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <HowItWorks />
      <FeaturedFreelancers />
      <ClientLogos />
      <FreelancerCta />
    </>);

}